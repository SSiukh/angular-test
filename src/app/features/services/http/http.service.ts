import { Injectable } from '@angular/core';
import { BaseHttpService } from 'app/core/abstracts/base-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService extends BaseHttpService {
  public postRequest<TReq, TRes>(endpoint: string, body: TReq): Observable<TRes> {
    return this.post<TReq, TRes>(endpoint, body);
  }
}
