import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Domain } from '@product-domain/task';

import {
  TaskComponent,
  FormTaskComponent,
  EditModalComponent,
} from './components';
import { TaskService } from '../../core/services/task.service';

type Task = Domain.Task;
type TaskCreateInput = Domain.TaskCreateInput;

const Components = [FormTaskComponent, TaskComponent, EditModalComponent];
@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, ...Components],
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class AppToDoComponent implements OnInit {
  taskEditMode = false;
  taskToEdit = {} as Task;
  tasks: Task[] = [];

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    const setTasks = (tasks: Task[]) => {
      this.tasks = tasks;
    };
    this.taskService.getAllTask().then(setTasks);
  }

  addTask(task: TaskCreateInput) {
    this.tasks.unshift({
      id: `${this.tasks.length + 1}`,
      ...task,
      createdAt: new Date(),
      deletedAt: null,
    });
  }

  onHandleTaskEdit(task: Task) {
    this.taskToEdit = task;
    this.taskEditMode = true;
  }

  onHandleEndTaskEdit(val: boolean) {
    console.info({ val });
    this.taskEditMode = val;
  }

  submitEditTask(task: Task) {
    const index = this.tasks.findIndex((t) => t.id === task.id);

    this.tasks = this.tasks
      .slice(0, index)
      .concat([task])
      .concat(this.tasks.slice(index + 1));

    this.taskEditMode = false;
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
