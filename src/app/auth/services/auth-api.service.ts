import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../interfaces/login-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http = inject(HttpClient);

  private loginUrl = environment.baseUrl + 'api/login/';
  private registerUrl = environment.baseUrl + 'api/register/';
  private checkAuthUrl = environment.baseUrl + 'api/check-auth/';
  private logoutUrl = environment.baseUrl + 'api/logout/';

  constructor() {}

  loginWithEmailAndPawword(
    email: string,
    password: string,
  ): Observable<LoginResponse> {
    const body = { email, password };

    return this.http.post<LoginResponse>(this.loginUrl, body);
  }

  registerUserWithUsernameAndPassword(
    username: string,
    email: string,
    password: string,
  ) {
    const body = { name: username, email: email, password: password };

    return this.http.post(this.registerUrl, body);
  }

  checkAuth() {
    return this.http.get<{ message?: string }>(this.checkAuthUrl);
  }

  logout() {
    return this.http.post(this.logoutUrl, {});
  }

  verifyEmail(url: string) {
    return this.http.get<{ message: string }>(url);
  }
}
