import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Domain } from '@product-domain/task';

import { FormTaskComponent } from '..';

import {
  ModalBaseComponent,
  InputTextFormComponent,
} from '../../../../shared/components';

type Task = Domain.Task;
type TaskUpdateInput = Domain.TaskUpdateInput;

const Components = [
  FormTaskComponent,
  ModalBaseComponent,
  InputTextFormComponent,
];

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...Components],
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.scss',
})
export class EditModalComponent {
  @Input() show = true;
  @Input() taskToEdit = {} as Task;

  @Output() submitEditTaskEvent = new EventEmitter();
  @Output() closeModalEvent = new EventEmitter<false>();

  getTaskToEdited(task: TaskUpdateInput) {
    delete task.checked;
    this.submitEditTaskEvent.emit({
      ...this.taskToEdit,
      ...task,
    });
  }

  closeModal() {
    this.closeModalEvent.emit(false);
  }
}
