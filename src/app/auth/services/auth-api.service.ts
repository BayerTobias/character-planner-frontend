import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http = inject(HttpClient);

  constructor() {}

  login(email: string, password: string) {
    const url = environment.baseUrl + 'api/login/';
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body);
  }
}
