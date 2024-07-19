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
  title: string;
  valid: boolean;
  errors: { [x: string]: boolean };
};

type TaskCreateInput = Domain.TaskCreateInput;

const Components = [InputTextFormComponent];
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, ...Components],
  selector: 'app-form-auth',
  templateUrl: './form-auth.component.html',
  styleUrl: './form-auth.component.scss',
})
export class FormTaskComponent implements OnChanges {
  @Input() buttonText = 'Edit';
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
  }

  formTaskTitle = new FormControl(this.titleValue, {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(45)],
  });

  onHandleInputText(titleInput: TitleInput) {
    if (!titleInput.valid) {
      return console.error('Form not valid');
    }

    this.taskToCreteRetrieved.emit({
      title: titleInput.title,
      description: '',
      checked: false,
    });

    this.formTaskTitle.reset();
  }
}
