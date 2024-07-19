import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ConfirmRegisterModalComponent } from './components';
import { InputTextFormComponent } from '../../shared/components';

const Components = [ConfirmRegisterModalComponent, InputTextFormComponent];
@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, ...Components],
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  show = false;

  onHandleLogin() {
    this.show = true;
  }

  closeModal() {
    this.show = false;
  }
}
