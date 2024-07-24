import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  constructor() {}

  loginWithUsernameAndPawword(username: string, password: string) {
    const url = environment.baseUrl + '/auth/login/';
    const body = { username: username, password: password };

    return lastValueFrom(this.http.post(url, body));
  }
}
