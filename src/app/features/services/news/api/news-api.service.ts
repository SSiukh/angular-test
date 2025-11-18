import { Injectable } from '@angular/core';
import { BaseHttpService } from 'app/core/abstracts/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService extends BaseHttpService {
  constructor() {
    super();
    this.setBaseUrl('news');
  }
}
