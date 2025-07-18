import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  async ngOnInit() {
    const route = this.route.queryParams.subscribe(async (params) => {
      const url = params['url'];

      try {
        const response = await this.authService.verifyEmail(url);
        this.message = response.message;
        console.log(response.message);
      } catch (err: unknown) {
        if (err instanceof HttpErrorResponse) {
          console.error(err);
          this.message = err.message;
        } else {
          this.message = 'unknown error';
        }
      }
    });
  }
}
