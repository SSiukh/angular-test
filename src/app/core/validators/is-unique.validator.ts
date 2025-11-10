import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UniqueCheckConfig } from './types';
import { HttpService } from 'app/features/services/http/http.service';

export function uniqueValidator<TReq, TRes>(
  http: HttpService,
  config: UniqueCheckConfig<TReq, TRes>
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return from(http.postRequest<TReq, TRes>(config.endpoint, config.body(control.value))).pipe(
      map((res) => (config.isUnique(res) ? null : { notUnique: true })),
      catchError(() => of(null))
    );
  };
}
