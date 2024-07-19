import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Domain } from '@product-domain/task';

type Task = Domain.Task;

@Component({
  imports: [],
  standalone: true,
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() task: Task = {
    id: `${Math.random() * 100}`,
    title: 'Task 1',
    description: 'Description Test',
    checked: true,
    createdAt: new Date(),
    deletedAt: null,
  };

  @Output() taskToEditEvent = new EventEmitter<Task>();
  @Output() taskToDeleteEvent = new EventEmitter<string>();

  onToggleChecked(checked: boolean) {
    this.task.checked = checked;
  }

  onHandleEdit(task: Task) {
    this.taskToEditEvent.emit(task);
  }

  onHandleDelete(id: string) {
    this.taskToDeleteEvent.emit(id);
  }
}
