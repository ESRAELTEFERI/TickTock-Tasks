import { Component } from '@angular/core';
import { TodoService, Task } from '../todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TodoComponent {
  tasks: Task[] = [];
  taskName: string = '';

  constructor(private todoService: TodoService) {
    this.loadTasks();
  }

  loadTasks() {
    this.todoService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  addTask() {
    if (!this.taskName.trim()) return;
    this.todoService.addTask(this.taskName).subscribe((task) => {
      this.tasks.push(task);
      this.taskName = '';
    });
  }

  removeTask(id: string) {
    this.todoService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task._id !== id);
    });
  }
}
