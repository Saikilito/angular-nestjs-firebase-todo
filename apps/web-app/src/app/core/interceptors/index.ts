import {
  HttpRequest,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { CONSTANTS, Errors } from '@shared';
import { CONSTANTS as ANGULAR_CONSTANTS } from '../../shared/constants';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

const { HTTP_STATUS_CODE } = CONSTANTS;

const tryCatchNext = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  router: Router,
  toastr: ToastrService
) =>
  next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const error: Errors.ObjectError = err.error;

      if (
        error &&
        error.statusCode === HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
      ) {
        toastr.error(error.message);
        router.navigate([ANGULAR_CONSTANTS.ROUTES.AUTH]);
      }
      throw err;
    })
  );

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const authService = inject(AuthService);

  const token = authService.getToken();
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `bearer ${token}`),
    });

    return tryCatchNext(cloned, next, router, toastr);
  }

  return tryCatchNext(req, next, router, toastr);
};
