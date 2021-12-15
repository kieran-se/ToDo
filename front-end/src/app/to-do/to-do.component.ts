import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoItem } from '../core/models/todo-item';
import { TaskListService } from '../core/services/task-list/task-list.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogService } from '../core/services/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {

  todoList: TodoItem[] = [];

  constructor(
    private taskListService: TaskListService,
    private toastr: ToastrService,
    private confirmDialogService: ConfirmDialogService
  ) {

  }

  ngOnInit(): void {

  }

  handleRemove(event: TodoItem) {
    if(event.complete){
      this.showDialog(event);
    } else {
      this.delete(event);
    }
  }

  showDialog(event: TodoItem) {
    this.confirmDialogService.confirmThis(
      `Are you sure you want to delete the completed task with id ${event.id}?`, 
      () => {  
        this.delete(event);
      },
      () => {  
          
      }
    ) 
  }

  delete(event: TodoItem) {
    this.taskListService.delete(event.id).subscribe({
      complete: () => {
        this.todoList = this.todoList.filter((todo: TodoItem) => {
          return todo.id !== event.id;
        });
      },
      error: () => {
        this.toastr.error('Something went wrong', 'Error', {
          positionClass: 'toast-bottom-right' 
        });
      }
    });
  }

  handleAdd(event: TodoItem) {
    this.taskListService.add(event).subscribe({
      complete: () => {
        this.todoList = [...this.todoList, event];
      },
      error: () => {
        this.toastr.error('Something went wrong', 'Error', {
          positionClass: 'toast-bottom-right' 
        });
      }
    });
  }

  handleCompleteChange(event: any) {
    this.taskListService.update(event).subscribe({
      complete: () => {
        this.toastr.success('Task updated', 'Success', {
          positionClass: 'toast-bottom-right' 
        });
      },
      error: () => {
        this.toastr.error('Something went wrong', 'Error');
      }
    });
  }
}
