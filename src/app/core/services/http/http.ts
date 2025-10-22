import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly url = 'https://rm-united24-rebuild-api-public.demo.ukrohost.com/';

  constructor(private http: HttpClient) {}

  async post<REQ, RES>(endPoint: string, body: REQ): Promise<RES> {
    return await firstValueFrom(this.http.post<RES>(`${this.url}${endPoint}`, body));
  }
}
