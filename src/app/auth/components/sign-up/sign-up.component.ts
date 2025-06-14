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
      try {
        const resp = await this.authService.registerUserWithUsernameAndPassword(
          this.username?.value,
          this.email?.value,
          this.password?.value
        );
        console.log(resp);
      } catch (err) {
        console.error(err);
      }
    } else this.signupForm.markAllAsTouched();
  }

  close() {
    this.slideIn = false;
    setTimeout(() => {
      this.closeSignup.emit();
    }, 1000);
  }
}
