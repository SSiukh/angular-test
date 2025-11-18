import { Component } from '@angular/core';
import { NewsToolbarComponent } from './components/news-toolbar/news-toolbar.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsPaginationComponent } from './components/news-pagination/news-pagination.component';

@Component({
  selector: 'app-news',
  imports: [NewsToolbarComponent, NewsListComponent, NewsPaginationComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent {}
