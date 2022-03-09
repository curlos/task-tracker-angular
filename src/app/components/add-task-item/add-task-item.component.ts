import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';

@Component({
  selector: 'app-add-task-item',
  templateUrl: './add-task-item.component.html',
  styleUrls: ['./add-task-item.component.css']
})
export class AddTaskItemComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter()
  todoText!: string

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    const newTask: Task = {
      text: this.todoText,
      complete: false
    }

    this.onAddTask.emit(newTask)

    this.todoText = ''
  }

}
