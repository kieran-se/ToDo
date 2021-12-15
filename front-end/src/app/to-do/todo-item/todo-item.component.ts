import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoItem } from 'src/app/core/models/todo-item';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: TodoItem;

  @Output() remove = new EventEmitter<TodoItem>();
  @Output() completeChange = new EventEmitter<TodoItem>();

  constructor() { 
  }

  ngOnInit(): void {
    this.todo = {...this.todo};
  }

  onRemove() {
    this.remove.emit(this.todo);
  }

  onCompleteChange(event: any) {
    this.todo.complete = event.target.checked;
    this.completeChange.emit(this.todo);
  }

}
