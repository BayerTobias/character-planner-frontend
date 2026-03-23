import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  catchError,
  firstValueFrom,
  lastValueFrom,
  map,
  of,
  throwError,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private authApiService = inject(AuthApiService);

  constructor() {}

  loginWithEmailAndPawword(email: string, password: string) {
    return this.authApiService.loginWithEmailAndPawword(email, password);

    // const url = environment.baseUrl + 'api/login/';
    // const body = { email: email, password: password };

    // return lastValueFrom(this.http.post(url, body));
  }

  loginWithGoogleOauth() {
    const url = environment.baseUrl + 'api/google/';

    window.location.href = url;
  }

  registerUserWithUsernameAndPassword(
    username: string,
    email: string,
    password: string,
  ) {
    return this.authApiService.registerUserWithUsernameAndPassword(
      username,
      email,
      password,
    );
  }

  checkAuth() {
    return this.authApiService.checkAuth().pipe(
      map((response) => response && response.message === 'Authenticated'),
      catchError(() => of(false)),
    );
  }

  logout() {
    return this.authApiService.logout();
  }

  verifyEmail(url: string) {
    return this.authApiService.verifyEmail(url);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
}
