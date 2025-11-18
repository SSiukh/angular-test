import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NewsStateService } from 'app/features/services/news/state/news-state.service';
import { map, pairwise, startWith, Subject, takeUntil } from 'rxjs';
import { SvgIconComponent } from 'app/shared/ui/svg-icon/svg-icon.component';
import { NgSelectComponent } from '@ng-select/ng-select';
import { SelectData } from './types';
import { SortingData } from './datasets';

@Component({
  selector: 'app-news-toolbar',
  imports: [ReactiveFormsModule, SvgIconComponent, NgSelectComponent],
  templateUrl: './news-toolbar.component.html',
  styleUrl: './news-toolbar.component.scss',
})
export class NewsToolbarComponent implements OnInit, OnDestroy {
  private stateService = inject(NewsStateService);
  private destroy$ = new Subject<void>();

  toolbarForm!: FormGroup;

  categories: SelectData[] = [];
  newsQuantity = 0;
  sortingData = SortingData;

  ngOnInit(): void {
    this.stateService.loadCategories().pipe(takeUntil(this.destroy$)).subscribe();
    this.stateService
      .getState()
      .pipe(
        map((item) => ({
          ...item,
          categoryList: item.categoryList.map((category) => ({
            ...category,
            translationList: category.translationList.filter(
              (translation) => translation.lang === 'uk'
            ),
          })),
        })),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (value) => {
          this.newsQuantity = value.total;
          this.categories = value.categoryList.map((category) => ({
            id: category.id,
            title: category.translationList[0].title,
          }));
        },
      });

    this.toolbarForm = new FormGroup({
      category: new FormControl(null, {
        updateOn: 'change',
      }),
      term: new FormControl('', { updateOn: 'change' }),
      sort: new FormControl('ASC', { updateOn: 'change' }),
    });

    this.toolbarForm.valueChanges
      .pipe(startWith(this.toolbarForm.value), pairwise(), takeUntil(this.destroy$))
      .subscribe(([prev, curr]) => {
        if (prev.category !== curr.category) {
          this.stateService.updateQueryParams({ newsCategory: curr.category });
        }

        if (prev.term !== curr.term) {
          this.stateService.search(curr.term);
        }

        if (prev.sort !== curr.sort) {
          this.stateService.updateQueryParams({
            sortColumn: 'publishedAt',
            sortDirection: curr.sort,
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
