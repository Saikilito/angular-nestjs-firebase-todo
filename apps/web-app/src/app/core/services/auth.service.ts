import { catchError, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CONSTANTS } from '@shared';
import { envConfig } from '../../config';
import { CONSTANTS as ANGULAR_CONSTANTS } from '../../shared/constants';

type TokenResponse = {
  token: string;
};

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
        catchError((error) => {
          // Only for test this application
          // TODO: Review Error Response from backend
          if (error.status === CONSTANTS.HTTP_STATUS_CODE.UNAUTHORIZED) {
            return of(null);
          }

          throw error;
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
