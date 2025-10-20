import { Component } from '@angular/core';
import { TodoService, Task } from '../todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';

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

  loading = false;

  toggleCompleted(task: any) {
    this.todoService
      .updateTask(task._id, { completed: task.completed })
      .subscribe(() => {
        this.loadTasks();
      });
  }

  filter: string = 'all';

  filteredTasks() {
    if (this.filter === 'completed') {
      return this.tasks.filter((t) => t.completed);
    } else if (this.filter === 'active') {
      return this.tasks.filter((t) => !t.completed);
    }
    return this.tasks;
  }

  saveEdit(task: any) {
    task.editing = false;
    this.todoService.updateTask(task._id, { title: task.title }).subscribe();
  }

  loadTasks() {
    this.loading = true;
    this.todoService
      .getTasks()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((tasks) => (this.tasks = tasks));
  }
  // loadTasks() {
  //   this.loading = true;
  //   this.todoService
  //     .getTasks()
  //     .pipe(finalize(() => (this.loading = false)))
  //     .subscribe(
  //       (tasks) => {
  //         this.tasks = tasks;
  //         localStorage.setItem('tasks', JSON.stringify(tasks));
  //       },
  //       () => {
  //         this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  //       }
  //     );
  // }

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
