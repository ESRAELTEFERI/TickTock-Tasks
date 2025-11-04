// auth.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- for ngModel
import { CommonModule } from '@angular/common'; // <-- for *ngIf
import { Router } from '@angular/router'; // ✅ import Router
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule], // <-- must include these
})
export class AuthComponent {
  isLogin = true;
  name = '';
  email = '';
  password = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) { }

  submit() {

    this.loading = true;

    if (this.isLogin) {
      this.authService.login(this.email, this.password).subscribe({
        next: () => { this.loading = false; this.router.navigate(['/todo']) },
        error: (err) => { this.loading = false; alert(err.error.message || 'Login failed') },
      });
    } else {
      this.authService
        .register(this.name, this.email, this.password)
        .subscribe({
          next: () => location.reload(),
          error: (err) => alert(err.error.message || 'Registration failed'),
        });
    }
  }
}
