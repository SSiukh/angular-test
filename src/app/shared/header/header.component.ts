import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { LogoComponent } from '../ui/logo/logo.component';
import { ScreenService } from 'app/core/services/screen/screen.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent, LogoComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private screenService = inject(ScreenService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  width!: number;
  currentRoute = '';

  ngOnInit() {
    this.screenService.width$.pipe(takeUntil(this.destroy$)).subscribe((width) => {
      this.width = width;
    });
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
