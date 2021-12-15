import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ErrorInterceptor } from './error-interceptor.service';
import { TaskListService } from '../task-list/task-list.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ErrorInterceptor', () => {
  let testMessage: string = 'fake_message'; 
  let service: TaskListService;
  let interceptor: ErrorInterceptor;
  let httpMock: HttpTestingController;
  const errorInterceptorSpy = {
    ...jasmine.createSpyObj('HttpRequest', ['request']),
    ...jasmine.createSpyObj('HttpHandler', ['handle'])
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        TaskListService,
        ErrorInterceptor,
        {
          provide: HTTP_INTERCEPTORS, useclass: ErrorInterceptor, useValue: errorInterceptorSpy, multi: true
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(TaskListService);
    interceptor = TestBed.inject(ErrorInterceptor); 
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('intercept', () => {
    it('should trigger catcherror in interceptor', () => {
      errorInterceptorSpy.handle.and.returnValue(throwError(() => 'fake_message'));

      interceptor
        .intercept(errorInterceptorSpy, errorInterceptorSpy)
        .subscribe({
          next: (v) => console.log(v),
          error: (e) => {
            expect(e).toEqual(new Error(testMessage));
          },
          complete: () => console.info('complete - sorry') 
      })
    });
  });
});
