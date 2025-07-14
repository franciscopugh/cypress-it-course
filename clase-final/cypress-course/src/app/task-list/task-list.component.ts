import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().then(({ data }) => this.tasks = data || []);
  }

  addTask() {
    if (!this.newTask.trim()) return;
    this.taskService.addTask(this.newTask).then(() => {
      this.newTask = '';
      this.loadTasks();
    });
  }

  toggleCompleted(task: Task) {
    task.completed = !task.completed;
    this.taskService.updateTask(task).then(() => this.loadTasks());
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).then(() => this.loadTasks());
  }
}
