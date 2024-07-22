import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Domain } from '@product-domain/task';

type Task = Domain.Task;

@Component({
  imports: [],
  standalone: true,
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnChanges {
  @Input() task = {} as Task;

  @Output() taskToEditEvent = new EventEmitter<Task>();
  @Output() taskToDeleteEvent = new EventEmitter<string>();
  @Output() taskToCheckedEvent = new EventEmitter<{
    id: string;
    checked: boolean;
  }>();

  public createdAt = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      this.createdAt = `${this.task.createdAt}`.split('T')[0];
    }
  }

  onToggleChecked(checked: boolean) {
    this.taskToCheckedEvent.emit({ id: this.task.id, checked });
  }

  onHandleEdit(task: Task) {
    this.taskToEditEvent.emit(task);
  }

  onHandleDelete(id: string) {
    this.taskToDeleteEvent.emit(id);
  }
}
