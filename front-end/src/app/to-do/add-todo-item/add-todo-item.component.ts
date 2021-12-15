import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoItem } from 'src/app/core/models/todo-item';

@Component({
  selector: 'app-add-todo-item',
  templateUrl: './add-todo-item.component.html',
  styleUrls: ['./add-todo-item.component.scss']
})
export class AddTodoItemComponent implements OnInit {

  @Output() add = new EventEmitter<TodoItem>();
  addTodoForm!: FormGroup;
  submitted = false;
  
  constructor(private formBuilder: FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.addTodoForm = this.formBuilder.group({
      task: ['', Validators.required]
    });
  }

  get f() { return this.addTodoForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.addTodoForm.invalid) {
      return;
    }

    this.add.emit({ id: Math.floor(Math.random() * 99999), task: this.addTodoForm.value.task, complete: false });
    this.onReset();
  }

  onReset(): void {
    this.submitted = false;
    this.addTodoForm.reset();
  }
}
