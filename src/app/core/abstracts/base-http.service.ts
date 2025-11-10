import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environments';
import { Observable } from 'rxjs';

@Injectable()
export abstract class BaseHttpService {
  protected baseUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  protected get<TRes>(endpoint: string): Observable<TRes> {
    return this.http.get<TRes>(`${this.baseUrl}/${endpoint}`);
  }

  protected post<TReq, TRes>(endpoint: string, body: TReq): Observable<TRes> {
    return this.http.post<TRes>(`${this.baseUrl}/${endpoint}`, body);
  }

  protected put<TReq, Tres>(endpoint: string, body: TReq): Observable<Tres> {
    return this.http.put<Tres>(`${this.baseUrl}/${endpoint}`, body);
  }

  protected delete<TRes>(endpoint: string): Observable<TRes> {
    return this.http.delete<TRes>(`${this.baseUrl}/${endpoint}`);
  }
}
