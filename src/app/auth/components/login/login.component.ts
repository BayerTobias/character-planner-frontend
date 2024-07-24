import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../interfaces/login-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm: FormGroup;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  async login() {
    if (this.loginForm.valid) {
      localStorage.removeItem('token');
      try {
        const resp: LoginResponse =
          (await this.authService.loginWithUsernameAndPawword(
            this.username?.value,
            this.password?.value
          )) as LoginResponse;
        this.handleSuccessfullLogin(resp);
      } catch (err) {
        console.error(err);
      }
    } else this.loginForm.markAllAsTouched();
  }

  /**
   * Handles a successful login response by storing the authentication token in local storage
   * and navigating the user to the home page with public visibility.
   * @param resp The response containing the authentication token.
   */
  handleSuccessfullLogin(resp: LoginResponse) {
    localStorage.setItem('token', resp.token);
    this.router.navigateByUrl('/character');
  }
}
