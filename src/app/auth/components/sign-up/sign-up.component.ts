import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CustomValidators } from '../../custom-validators';
import { StandardButtonComponent } from '../../../shared/components/buttons/standard-button/standard-button.component';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    StandardButtonComponent,
    CommonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  public signupForm: FormGroup;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  public slideIn: boolean = false;
  public httpErrorMsg: string | null = null;

  @Output() closeSignup = new EventEmitter<void>();

  constructor() {
    this.signupForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, CustomValidators.emailValidator]],
        password: [
          '',
          [Validators.required, CustomValidators.passwordLengthValidator(8)],
        ],
        passwordRepeat: ['', Validators.required],
        privacyPolicy: [false, Validators.requiredTrue],
      },
      { validators: [CustomValidators.passwordMatchValidator] }
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.slideIn = true;
    }, 10);
  }

  /**
   * Getter method for the 'username' form control.
   *
   * @returns The 'username' form control.
   */
  get username() {
    return this.signupForm.get('username');
  }

  /**
   * Getter method for the 'email' form control.
   *
   * @returns The 'email' form control.
   */
  get email() {
    return this.signupForm.get('email');
  }

  /**
   * Getter method for the 'password' form control.
   *
   * @returns The 'password' form control.
   */
  get password() {
    return this.signupForm.get('password');
  }

  /**
   * Getter method for the 'passwordRepeat' form control.
   *
   * @returns The 'passwordRepeat' form control.
   */
  get passwordRepeat() {
    return this.signupForm.get('passwordRepeat');
  }

  /**
   * Getter method for the 'privacyPolicy' form control.
   *
   * @returns The 'privacyPolicy' form control.
   */
  get privacyPolicy() {
    return this.signupForm.get('privacyPolicy');
  }

  async signUp() {
    if (this.signupForm.valid) {
      this.httpErrorMsg = null;
      try {
        const resp = await this.authService.registerUserWithUsernameAndPassword(
          this.username?.value,
          this.email?.value,
          this.password?.value
        );
        console.log(resp);
      } catch (err) {
        console.log('Error:', err);

        this.handleError(err);
      }
    } else this.signupForm.markAllAsTouched();
  }

  handleError(error: unknown) {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 422) {
        this.httpErrorMsg = 'Diese E-Mail-Adresse ist bereits vergeben.';
      } else if (error.status === 500 || error.status === 0) {
        this.httpErrorMsg = 'Serverfehler, bitte versuche es später erneut.';
      }
    } else {
      this.httpErrorMsg = 'Keine Verbindung zum Server.';
    }
  }

  close() {
    this.slideIn = false;
    setTimeout(() => {
      this.closeSignup.emit();
    }, 1000);
  }
}
