import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NewsStateService } from 'app/features/services/news/state/news-state.service';
import { SvgIconComponent } from 'app/shared/ui/svg-icon/svg-icon.component';
import { Subject, takeUntil } from 'rxjs';
import { generatePages } from './inc/generate-pages';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-news-pagination',
  imports: [SvgIconComponent, NgClass],
  templateUrl: './news-pagination.component.html',
  styleUrl: './news-pagination.component.scss',
})
export class NewsPaginationComponent implements OnInit, OnDestroy {
  private stateService = inject(NewsStateService);
  private $destroy = new Subject<void>();

  totalNews!: number;
  currentPage!: number;
  pageSize!: number;
  totalPages!: number;
  pagesToShow!: (number | string)[];

  ngOnInit(): void {
    this.stateService
      .getState()
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: (value) => {
          this.totalNews = value?.total ?? 0;
          this.pageSize = value.queryParams?.pageSize ?? 10;
          this.currentPage = value.queryParams?.page ?? 1;

          this.totalPages = Math.ceil(this.totalNews / this.pageSize);
          this.pagesToShow = generatePages(this.totalPages, this.currentPage);
        },
      });
  }

  onPageChange(direction: 'left' | 'right'): void {
    this.stateService.updateQueryParams({
      page: direction === 'left' ? this.currentPage - 1 : this.currentPage + 1,
    });
  }

  onPageSelect(step: number | string): void {
    if (typeof step === 'number') {
      this.stateService.updateQueryParams({
        page: step,
      });
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
