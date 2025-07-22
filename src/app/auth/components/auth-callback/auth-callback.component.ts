import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss',
})
export class AuthCallbackComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  async ngOnInit() {
    const route = this.route.queryParams.subscribe(async (params) => {
      const token = params['token'];

      localStorage.setItem('token', token);
      this.router.navigateByUrl('/select-character');
    });
  }
}
