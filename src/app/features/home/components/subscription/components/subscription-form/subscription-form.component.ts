import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'app/core/services/modal/modal.service';
import { ScreenService } from 'app/core/services/screen/screen.service';
import { uniqueValidator } from 'app/core/validators/is-unique.validator';
import { HttpService } from 'app/features/services/http/http.service';
import { SubscribeRequest, SubscribeResponse } from 'app/shared/types';
import { ButtonComponent } from 'app/shared/ui/button/button.component';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { MODAL_TYPE } from 'app/features/home/components/subscription/datasets';

@Component({
  selector: 'app-subscription-form',
  imports: [ButtonComponent, ReactiveFormsModule, NgbModule],
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.scss',
})
export class SubscriptionFormComponent implements OnInit, OnDestroy {
  private screenService = inject(ScreenService);
  private httpService = inject(HttpService);
  private modalService = inject(ModalService);
  private toastr = inject(ToastrService);

  private destroy$ = new Subject<void>();
  @Output() loadingChange = new EventEmitter<boolean>();
  @Input() modalContent!: TemplateRef<NgbActiveModal>;

  width!: number;
  subscribeForm!: FormGroup;
  submitted = false;
  isLoading = false;

  ngOnInit(): void {
    this.screenService.width$.pipe(takeUntil(this.destroy$)).subscribe((width) => {
      this.width = width;
    });
    this.subscribeForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          uniqueValidator<SubscribeRequest, SubscribeResponse, string>(this.httpService, {
            endpoint: 'appeal/check-unique-email',
            body: (value) => ({ email: value }),
            isUnique: (res) => res.data.success,
          }),
        ],
        updateOn: 'submit',
      }),
    });
  }

  async onSubmit() {
    this.submitted = true;
    this.isLoading = true;
    this.loadingChange.emit(this.isLoading);

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
      this.loadingChange.emit(this.isLoading);
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
      this.modalService.open<NgbActiveModal>(MODAL_TYPE, this.modalContent, {
        centered: true,
        size: 'lg',
      });
    } catch {
      this.toastr.error('Не вдалося виконати запит', 'Помилка');
    } finally {
      this.isLoading = false;
      this.loadingChange.emit(this.isLoading);
    }
  }

  get email() {
    return this.subscribeForm.get('email');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
