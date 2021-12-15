import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TodoItem } from '../../models/todo-item';

import { TaskListService } from './task-list.service';

describe('TaskListService', () => {
  const dummyTodo: TodoItem = {
    id: 1,
    task: 'test task',
    complete: false
  }
  let service: TaskListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        TaskListService
      ]
    });
    service = TestBed.inject(TaskListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#add', () => {
    it('should return an Observable TodoItem', () => {
      
      service.add(dummyTodo).subscribe(response => {
        expect(response).toEqual(dummyTodo);
      })

      const httpRequest = httpMock.expectOne(`${service.apiUrl}`);
      expect(httpRequest.request.method).toBe('POST');
      httpRequest.flush(dummyTodo);
    });
  });

  describe('#update', () => {
    it('should return an Observable', () => {
      
      service.update(dummyTodo)
      .subscribe({
        next: (v) => {
          expect(v).toEqual(dummyTodo);
        }
    });

      const httpRequest = httpMock.expectOne(`${service.apiUrl}/${dummyTodo.id}`);
      expect(httpRequest.request.method).toBe('PUT');
      httpRequest.flush(dummyTodo);
    });
  });

  describe('#delete', () => {
    it('should return an Observable', () => {
      
      service.delete(dummyTodo.id)
      .subscribe({
        next: (v) => {
          expect(v).toEqual(dummyTodo);
        }
    });

      const httpRequest = httpMock.expectOne(`${service.apiUrl}/${dummyTodo.id}`);
      expect(httpRequest.request.method).toBe('DELETE');
      httpRequest.flush(dummyTodo);
    });
  });
});
