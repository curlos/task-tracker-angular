import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../Task'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {

  tasks: Task[] = []
  incompleteTasks: Task[] = []
  shownTasks: Task[] = []
  filter: string = 'All'


  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks
      this.shownTasks = tasks
      this.incompleteTasks = tasks.filter((task: Task) => !task.complete)
    })
  }

  getFilteredTasks(tasks: Task[], filter: string) {
    switch (filter) {
      case 'Active':
        return tasks.filter((task) => !task.complete)
      case 'Completed':
        return tasks.filter((task) => task.complete)
      default:
        return tasks
    }
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => {
      this.tasks.push(task)
      this.shownTasks = this.getFilteredTasks(this.tasks, this.filter)
    })
  }

  deleteTask(task: Task) {
    console.log('hello')
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id)
      this.shownTasks = this.getFilteredTasks(this.tasks, this.filter)
      this.incompleteTasks = this.tasks.filter((task: Task) => !task.complete)
    })
  }

  toggleCompleteTask(task: Task) {
    task.complete = !task.complete
    this.shownTasks = this.getFilteredTasks(this.tasks, this.filter)
    this.incompleteTasks = this.tasks.filter((task: Task) => !task.complete)
    this.taskService.toggleCompleteTask(task).subscribe()
  }

  changeFilter(newFilter: string) {
    this.filter = newFilter
    this.shownTasks = this.getFilteredTasks(this.tasks, newFilter)
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


}
