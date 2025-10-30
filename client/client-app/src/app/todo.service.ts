import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

export interface Task {
  _id?: string;
  title: string;
  completed: boolean;
  createdAt?: string;
  editing?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // private apiUrl = 'http://localhost:5000/api/tasks';
  private apiUrl = `${environment.apiUrl}/tasks`; // for TodoService

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, this.getAuthHeaders());
  }

  addTask(title: string): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, { title }, this.getAuthHeaders());
  }

  updateTask(id: string, updates: any): Observable<Task> {
    return this.http.put<Task>(
      `${this.apiUrl}/${id}`,
      updates,
      this.getAuthHeaders()
    );
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }
}
