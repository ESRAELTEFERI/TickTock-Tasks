import { Component } from '@angular/core';
import { TodoComponent } from './todo/todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true, // <-- important
  imports: [TodoComponent], // Import child standalone components here
})
export class AppComponent {
  title = 'todo-app';
}
