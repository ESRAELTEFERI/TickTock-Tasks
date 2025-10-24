import { Component } from '@angular/core';
// import { TodoComponent } from './todo/todo.component';
// import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true, // <-- important
  imports: [CommonModule, RouterModule],
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
