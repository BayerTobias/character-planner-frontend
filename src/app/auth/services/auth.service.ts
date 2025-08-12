import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, firstValueFrom, lastValueFrom, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  constructor() {}

  async loginWithEmailAndPawword(email: string, password: string) {
    const url = environment.baseUrl + 'api/login/';
    const body = { email: email, password: password };

    return lastValueFrom(this.http.post(url, body));
  }

  async loginWithGoogleOauth() {
    const url = environment.baseUrl + 'api/google/';

    window.location.href = url;
  }

  async registerUserWithUsernameAndPassword(
    username: string,
    email: string,
    password: string
  ) {
    const url = environment.baseUrl + 'api/register/';
    const body = { name: username, email: email, password: password };

    return lastValueFrom(this.http.post(url, body));
  }

  async checkAuth() {
    const url = environment.baseUrl + 'api/check-auth/';

    try {
      const response: { message?: string } = await lastValueFrom(
        this.http.get(url)
      );

      return response && response.message === 'Authenticated';
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async logout() {
    console.error('implement LOGOUT');
  }

  async verifyEmail(url: string) {
    return await lastValueFrom(this.http.get<{ message: string }>(url));
  }
}
