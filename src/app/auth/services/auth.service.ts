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

    // const url = environment.baseUrl + 'api/register/';
    // const body = { name: username, email: email, password: password };
    // return lastValueFrom(this.http.post(url, body));
  }

  checkAuth() {
    return this.authApiService.checkAuth().pipe(
      map((response) => response && response.message === 'Authenticated'),
      catchError(() => of(false)),
    );

    // const url = environment.baseUrl + 'api/check-auth/';

    // try {
    //   const response: { message?: string } = await lastValueFrom(
    //     this.http.get(url),
    //   );

    //   return response && response.message === 'Authenticated';
    // } catch (err) {
    //   console.error(err);
    //   return false;
    // }
  }

  logout() {
    return this.authApiService.logout();
  }

  async verifyEmail(url: string) {
    return await lastValueFrom(this.http.get<{ message: string }>(url));
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
}
