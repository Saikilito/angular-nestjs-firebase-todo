import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Component, inject, Input } from '@angular/core';

import { CONSTANTS } from '../../shared/constants';
import { ConfirmRegisterModalComponent } from './components';
import { AuthService } from '../../core/services/auth.service';
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
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);

  @Input() inputLogin = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public show = false;

  async onHandleLogin() {
    const isValidEmail = this.inputLogin.valid;
    if (!isValidEmail) {
      return this.toastr.error('Should set a valid email');
    }

    const email = this.inputLogin.value as string;

    const response = await firstValueFrom(this.authService.login(email));

    if (response) {
      return this.router.navigate([CONSTANTS.ROUTES.TODO_APP]);
    }

    return firstValueFrom(this.authService.register(email))
      .then(() => (this.show = true))
      .catch((err) => this.toastr.error(err.message));
  }

  closeModal() {
    this.show = false;
    return this.router.navigate([CONSTANTS.ROUTES.TODO_APP]);
  }
}
