import { inject, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator } from '@angular/forms';
import { HttpService } from '../../../core/services/http/http';
import { SubscribeRequest, SubscribeResponse } from '../../interfaces';
import { from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class IsUniqueEmail implements AsyncValidator {
  private readonly httpService = inject(HttpService);

  validate(control: AbstractControl) {
    if (!control.value) {
      return of(null);
    }

    return from(
      this.httpService.post<SubscribeRequest, SubscribeResponse>('appeal/check-unique-email', {
        email: control.value,
      })
    ).pipe(
      map((res) => (!res.data.success ? { emailExists: true } : null)),
      catchError(() => of(null))
    );
  }
}
