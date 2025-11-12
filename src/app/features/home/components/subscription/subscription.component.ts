import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from 'app/shared/ui/button/button.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SvgIconComponent } from 'app/shared/ui/svg-icon/svg-icon.component';
import { LoaderComponent } from 'app/shared/ui/loader/loader.component';
import { ScreenService } from 'app/core/services/screen/screen.service';
import { Subject, takeUntil } from 'rxjs';
import { SubscriptionFormComponent } from './components/subscription-form/subscription-form.component';

@Component({
  selector: 'app-subscription',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    NgbModule,
    SvgIconComponent,
    LoaderComponent,
    SubscriptionFormComponent,
  ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss',
  standalone: true,
})
export class SubscriptionComponent implements OnInit, OnDestroy {
  private screenService = inject(ScreenService);

  private destroy$ = new Subject<void>();
  isLoading = false;
  width!: number;

  ngOnInit(): void {
    this.screenService.width$.pipe(takeUntil(this.destroy$)).subscribe((width) => {
      this.width = width;
    });
  }

  onLoadingChange(loading: boolean) {
    this.isLoading = loading;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
