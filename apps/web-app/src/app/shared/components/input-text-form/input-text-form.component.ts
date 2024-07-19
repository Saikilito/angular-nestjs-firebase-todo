import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  standalone: true,
  selector: 'app-input-text-form',
  templateUrl: './input-text-form.component.html',
  styleUrl: './input-text-form.component.scss',
})
export class InputTextFormComponent {
  @Input() inputText = new FormControl('');
  @Input() placeholder = 'Add Title task';
  @Input() buttonText = 'Add';

  @Output() inputTextFormClick = new EventEmitter();

  handleClick() {
    this.inputTextFormClick.emit({
      value: this.inputText.value,
      valid: this.inputText.valid,
      errors: this.inputText.errors,
    });
  }
}
