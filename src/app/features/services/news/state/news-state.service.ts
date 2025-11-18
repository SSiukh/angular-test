import { inject, Injectable } from '@angular/core';
import { NewsState, QueryParams } from './types';
import { BehaviorSubject, debounceTime, Observable, Subject, switchMap, tap } from 'rxjs';
import { NewsApiService } from '../api/news-api.service';
import { HttpParams } from '@angular/common/http';
import { NewsReponse } from './types/news-response.interface';
import { CategoriesResponse } from './types/categories-response.interface';

@Injectable({
  providedIn: 'root',
})
export class NewsStateService {
  private apiService = inject(NewsApiService);
  private initialState: NewsState = {
    newsList: [],
    categoryList: [],
    total: 0,
    isLoading: false,
    queryParams: {
      page: 1,
      pageSize: 10,
      lang: 'uk',
    },
  };

  private behaviourState$ = new BehaviorSubject<NewsState>(this.initialState);
  private searchSubject$ = new Subject<string>();

  constructor() {
    this.searchSubject$
      .pipe(
        debounceTime(300),
        tap((term) => {
          this.updateQueryParams({ searchTerm: term, page: 1 });
        }),
        switchMap(() => this.loadNews())
      )
      .subscribe();
  }

  public getState(): Observable<NewsState> {
    return this.behaviourState$.asObservable();
  }

  public search(query: string): void {
    this.searchSubject$.next(query);
  }

  public loadNews(): Observable<NewsReponse> {
    const { queryParams } = this.behaviourState$.value;
    this.updateState({ isLoading: true });

    const params = this.buildHttpParams(queryParams);

    return this.apiService.get<NewsReponse>('news/list', params).pipe(
      tap((response) => {
        this.updateState({
          newsList: response.data,
          total: response.meta.total,
          isLoading: false,
        });
      })
    );
  }

  public loadCategories(): Observable<CategoriesResponse> {
    return this.apiService.get<CategoriesResponse>('news-category/reference').pipe(
      tap((response) => {
        this.updateState({
          categoryList: response.data,
        });
      })
    );
  }

  public updateQueryParams(queryParams: Partial<QueryParams>): void {
    const currentParams = this.behaviourState$.value.queryParams;

    this.updateState({ queryParams: { ...currentParams, ...queryParams, lang: 'uk' } });
    this.loadNews().subscribe();
  }

  private updateState(partial: Partial<NewsState>): void {
    this.behaviourState$.next({ ...this.behaviourState$.value, ...partial });
  }

  private buildHttpParams(queryParams: Partial<QueryParams>): HttpParams {
    let params = new HttpParams();

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params = params.set(key, String(value));
      }
    });

    return params;
  }
}
