import { catchError, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CONSTANTS, Errors } from '@shared';
import { envConfig } from '../../config';
import { CONSTANTS as ANGULAR_CONSTANTS } from '../../shared/constants';

type TokenResponse = {
  token: string;
};

const { HTTP_STATUS_CODE } = CONSTANTS;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private uri = `${envConfig.SERVER_URL}/auth`;

  constructor(private readonly httpService: HttpClient) {}

  login(email: string) {
    return this.httpService
      .post<TokenResponse>(`${this.uri}/login`, {
        email,
      })
      .pipe(
        tap(this.setToken),
        catchError((err: HttpErrorResponse) => {
          const error: Errors.ObjectError = err.error;
          if (error && error.statusCode === HTTP_STATUS_CODE.NOT_FOUND) {
            return of(null);
          }

          throw err;
        })
      );
  }

  register(email: string) {
    return this.httpService
      .post<TokenResponse>(`${this.uri}/register`, {
        email,
      })
      .pipe(tap(this.setToken));
  }

  setToken = ({ token }: { token: string }): void => {
    localStorage.setItem(ANGULAR_CONSTANTS.LOCAL_STORAGE.TOKEN, token);
  };

  getToken = (): string | null => {
    return localStorage.getItem(ANGULAR_CONSTANTS.LOCAL_STORAGE.TOKEN);
  };
}
