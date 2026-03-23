import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  public message: string | null = null;

  ngOnInit() {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          const url = params['url'];
          if (!url) throw new Error('Missing verification URL');
          return this.authService.verifyEmail(url);
        }),
      )
      .subscribe({
        next: (response) => {
          this.message = response.message;
          console.log(response.message);
        },
        error: (err: unknown) => {
          if (err instanceof HttpErrorResponse) {
            console.error(err);
            this.message = err.message;
          } else {
            this.message = 'unknown error';
          }
        },
      });
  }
}
