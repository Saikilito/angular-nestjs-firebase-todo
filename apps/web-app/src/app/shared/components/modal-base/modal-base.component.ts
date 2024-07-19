import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-modal-base',
  templateUrl: './modal-base.component.html',
  styleUrl: './modal-base.component.scss',
})
export class ModalBaseComponent {
  @Input() show = true;
  @Input() modalTitle = 'Modal Title';

  @Output() closeModalEvent = new EventEmitter<false>();

  onHandleCloseModal() {
    this.closeModalEvent.emit(false);
  }
}
