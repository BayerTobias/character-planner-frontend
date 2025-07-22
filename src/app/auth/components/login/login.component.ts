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
import { HttpErrorResponse } from '@angular/common/http';

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
  public httpErrorMsg: string | null = null;

  @Output() closeLogin = new EventEmitter<void>();

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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
      this.httpErrorMsg = null;
      localStorage.removeItem('token');
      try {
        const resp: LoginResponse =
          (await this.authService.loginWithEmailAndPawword(
            this.email?.value,
            this.password?.value
          )) as LoginResponse;
        this.handleSuccessfullLogin(resp);
      } catch (err) {
        this.handleError(err);
      }
    } else this.loginForm.markAllAsTouched();
  }

  handleError(error: unknown) {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      this.httpErrorMsg = 'E-Mail oder Passwort ist falsch';
    } else {
      this.httpErrorMsg =
        'Unbekannter Fehler. Bitte versuche es später erneut.';
    }
  }

  async loginWithGoogle() {
    try {
      this.authService.loginWithGoogleOauth();
    } catch (err) {
      console.error(err);
    }
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
