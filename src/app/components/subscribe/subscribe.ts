import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '../../shared/components/button/button';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SvgIcon } from '../../shared/components/svg-icon/svg-icon';
import { HttpService } from '../../core/services/http/http';
import { ToastrService } from 'ngx-toastr';
import { SubscribeRequest, SubscribeResponse } from '../../shared/interfaces';
import { IsUniqueEmail } from '../../shared/directives/is-unique-email/is-unique-email';
import { Loader } from '../../shared/components/loader/loader';
import { ScreenService } from '../../core/services/screen/screen';

@Component({
  selector: 'app-subscribe',
  imports: [ReactiveFormsModule, Button, NgbModule, SvgIcon, Loader],
  templateUrl: './subscribe.html',
  styleUrl: './subscribe.css',
  standalone: true,
})
export class Subscribe {
  constructor(
    private modalService: NgbModal,
    private httpService: HttpService,
    private toastr: ToastrService,
    private isUniqueEmail: IsUniqueEmail,
    private screenService: ScreenService
  ) {}

  submitted: boolean = false;
  isLoading: boolean = false;
  subscribeForm!: FormGroup;
  width!: number;

  ngOnInit() {
    this.screenService.width$.subscribe((width) => {
      this.width = width;
    });
    this.subscribeForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.isUniqueEmail.validate.bind(this.isUniqueEmail)],
        updateOn: 'blur',
      }),
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.width = screen.width;
  }

  async onSubmit(modalContent: any) {
    this.submitted = true;
    this.isLoading = true;

    const email = this.subscribeForm.get('email')?.value;

    this.subscribeForm.markAllAsTouched();
    this.subscribeForm.updateValueAndValidity();

    if (this.subscribeForm.pending) {
      await new Promise<void>((resolve) => {
        const sub = this.subscribeForm.statusChanges.subscribe((status) => {
          if (status !== 'PENDING') {
            sub.unsubscribe();
            resolve();
          }
        });
      });
    }

    if (this.subscribeForm.invalid || !email) {
      this.isLoading = false;
      return;
    }

    try {
      await this.httpService.post<SubscribeRequest, SubscribeResponse>('appeal/create', { email });
      this.subscribeForm.reset();
      this.submitted = false;
      this.modalService.open(modalContent, { centered: true, size: 'lg' });
    } catch {
      this.toastr.error('Не вдалося виконати запит', 'Помилка');
    } finally {
      this.isLoading = false;
    }
  }

  get email() {
    return this.subscribeForm.get('email');
  }
}
