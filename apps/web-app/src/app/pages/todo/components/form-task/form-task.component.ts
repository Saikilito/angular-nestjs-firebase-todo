import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { match, P } from 'ts-pattern';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private toastr: ToastrService) {}

  titleMaxLength = 45;
  descriptionMaxLength = 80;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['titleValue']) {
      this.formTaskTitle = new FormControl(this.titleValue, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(this.titleMaxLength),
        ],
      });
    }

    if (changes['descriptionValue']) {
      this.formTaskDescription = new FormControl(this.descriptionValue, {
        nonNullable: true,
        validators: [Validators.maxLength(this.descriptionMaxLength)],
      });
    }
  }

  formTaskTitle = new FormControl(this.titleValue, {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.maxLength(this.titleMaxLength),
    ],
  });

  formTaskDescription = new FormControl(this.descriptionValue, {
    nonNullable: true,
    validators: [Validators.maxLength(this.descriptionMaxLength)],
  });

  onHandleInputText(titleInput: TitleInput) {
    match(this.formTaskTitle)
      .with({ valid: false, errors: P._ }, (formTaskTitle) =>
        match(formTaskTitle.errors)
          .with({ required: true }, () =>
            this.toastr.error('Title is required')
          )
          .with({ maxlength: P.not(P.nullish) }, () =>
            this.toastr.error(
              `Title size too large, should be less or equal than ${this.titleMaxLength} characters`
            )
          )
          .otherwise(() => this.toastr.error('An unexpected error occurred'))
      )
      .otherwise(() =>
        match(this.formTaskDescription).with(
          { valid: false, errors: P._ },
          (formTaskDescription) =>
            match(formTaskDescription.errors)
              .with({ maxlength: P.not(P.nullish) }, () =>
                this.toastr.error(
                  `Description size too large, should be less or equal than ${this.descriptionMaxLength} characters`
                )
              )
              .otherwise(() =>
                this.toastr.error('An unexpected error occurred')
              )
        )
      );

    if (!this.formTaskTitle.valid || !this.formTaskDescription.valid) {
      return;
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
