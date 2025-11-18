import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { Subject, takeUntil } from 'rxjs';
import { NewsStateService } from 'app/features/services/news/state/news-state.service';
import { NewsData } from './types';

@Component({
  selector: 'app-news-list',
  imports: [NewsItemComponent],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss',
})
export class NewsListComponent implements OnInit, OnDestroy {
  private stateService = inject(NewsStateService);
  private destroy$ = new Subject<void>();

  news: NewsData[] = [];
  total = 0;
  isLoading = false;

  ngOnInit(): void {
    this.stateService.loadNews().pipe(takeUntil(this.destroy$)).subscribe();
    this.stateService
      .getState()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.news = value.newsList.map(
            ({
              id,
              publishedAt,
              newsCategory: { translationList: categoryTranslations },
              translationList: newsTranslations,
            }) => ({
              id,
              publishedAt,
              category: categoryTranslations[0].title,
              title: newsTranslations[0].title,
              description: newsTranslations[0].description,
              thumbnailUrl: newsTranslations[0].thumbnailUrl,
            })
          );
          this.isLoading = value.isLoading;
          this.total = value.total;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
