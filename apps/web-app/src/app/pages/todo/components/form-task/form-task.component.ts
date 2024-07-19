import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Domain } from '@product-domain/task';

import { InputTextFormComponent } from '../../../../shared/components';

type TitleInput = {
  value: string;
  valid: boolean;
  errors: { [x: string]: boolean };
};

type TaskCreateInput = Domain.TaskCreateInput;

const Components = [InputTextFormComponent];
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, ...Components],
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.scss',
})
export class FormTaskComponent implements OnChanges {
  @Input() buttonText = 'Add';
  @Input() titleValue = '';
  @Input() descriptionValue = '';
  @Output() taskToCreteRetrieved = new EventEmitter<TaskCreateInput>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['titleValue']) {
      this.formTaskTitle = new FormControl(this.titleValue, {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(45)],
      });
    }

    if (changes['descriptionValue']) {
      this.formTaskDescription = new FormControl(this.descriptionValue, {
        nonNullable: true,
        validators: [Validators.maxLength(45)],
      });
    }
  }

  formTaskTitle = new FormControl(this.titleValue, {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(45)],
  });

  formTaskDescription = new FormControl(this.descriptionValue, {
    nonNullable: true,
    validators: [Validators.maxLength(45)],
  });

  onHandleInputText(titleInput: TitleInput) {
    if (!this.formTaskDescription.valid || !titleInput.valid) {
      return console.error('Form not valid');
    }

    this.taskToCreteRetrieved.emit({
      title: titleInput.value,
      description: this.formTaskDescription.value,
      checked: false,
    });

    this.formTaskTitle.reset();
    this.formTaskDescription.reset();
  }
}
