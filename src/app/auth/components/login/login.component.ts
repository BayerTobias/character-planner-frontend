import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
import { StandardButtonComponent } from '../../../shared/components/buttons/standard-button/standard-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StandardButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm: FormGroup;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public slideIn: boolean = false;

  @Output() closeLogin = new EventEmitter<void>();

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.slideIn = true;
    }, 10);
  }

  get email() {
    return this.loginForm.get('email');
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
            this.email?.value,
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
    localStorage.setItem('token', resp.access_token);
    this.router.navigateByUrl('/select-character');
  }

  close() {
    this.slideIn = false;
    setTimeout(() => {
      this.closeLogin.emit();
    }, 1000);
  }
}
