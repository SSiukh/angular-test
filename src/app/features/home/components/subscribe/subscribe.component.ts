import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from 'app/shared/ui/button/button.component';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SvgIconComponent } from 'app/shared/ui/svg-icon/svg-icon.component';
import { HttpService } from 'app/features/services/http/http.service';
import { ToastrService } from 'ngx-toastr';
import { SubscribeRequest, SubscribeResponse } from 'app/shared/types';
import { LoaderComponent } from 'app/shared/ui/loader/loader.component';
import { ScreenService } from 'app/core/services/screen/screen.service';
import { firstValueFrom } from 'rxjs';
import { uniqueValidator } from 'app/core/validators/is-unique.validator';

@Component({
  selector: 'app-subscribe',
  imports: [ReactiveFormsModule, ButtonComponent, NgbModule, SvgIconComponent, LoaderComponent],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css',
  standalone: true,
})
export class SubscribeComponent {
  constructor(
    private modalService: NgbModal,
    private httpService: HttpService,
    private toastr: ToastrService,
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
        asyncValidators: [
          uniqueValidator<SubscribeRequest, SubscribeResponse>(this.httpService, {
            endpoint: 'appeal/check-unique-email',
            body: (value) => ({ email: value }),
            isUnique: (res) => res.data.success,
          }),
        ],
        updateOn: 'blur',
      }),
    });
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
      await firstValueFrom(
        this.httpService.postRequest<SubscribeRequest, SubscribeResponse>('appeal/create', {
          email,
        })
      );
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
