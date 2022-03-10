import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task
  @Output() deleteTaskClick = new EventEmitter()
  @Output() toggleCompleteClick = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteClick() {
    this.deleteTaskClick.emit()
  }

  toggleComplete() {
    this.toggleCompleteClick.emit()
  }

}
