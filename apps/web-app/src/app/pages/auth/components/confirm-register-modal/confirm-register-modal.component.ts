import { Input, Output, Component, EventEmitter } from '@angular/core';

import { ModalBaseComponent } from '../../../../shared/components';

const Components = [ModalBaseComponent];
@Component({
  standalone: true,
  imports: [...Components],
  selector: 'app-confirm-register-modal',
  templateUrl: './confirm-register-modal.component.html',
  styleUrl: './confirm-register-modal.component.scss',
})
export class ConfirmRegisterModalComponent {
  @Input() show = false;
  @Input() buttonText = 'Edit';

  @Output() closeModalEvent = new EventEmitter<false>();
  @Output() taskToCreteRetrievedEvent = new EventEmitter<boolean>();

  modalTitle = 'Confirm Register';

  closeModal() {
    this.closeModalEvent.emit(false);
  }
}
