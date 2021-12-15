import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TodoItem } from '../../models/todo-item';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  constructor(private http: HttpClient) { 

  }

  readonly apiUrl: string = environment.task_api_url;

  add(body: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(`${this.apiUrl}`, body).pipe();
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe();
  }

  update(body: TodoItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/${body.id}`, body).pipe();
  }
}
