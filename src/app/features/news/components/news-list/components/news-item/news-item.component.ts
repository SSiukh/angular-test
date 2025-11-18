import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NewsData } from 'app/features/news/components/news-list/types';

@Component({
  selector: 'li[app-news-item]',
  imports: [DatePipe],
  templateUrl: './news-item.component.html',
  styleUrl: './news-item.component.scss',
  standalone: true,
})
export class NewsItemComponent {
  @Input() data!: NewsData;
}
