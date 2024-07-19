import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';

import { Domain } from '@product-domain/user';

import { ConfirmRegisterModalComponent } from './components';
import { InputTextFormComponent } from '../../shared/components';

const Components = [ConfirmRegisterModalComponent, InputTextFormComponent];

type User = Domain.User;
@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, ...Components],
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  constructor(private router: Router) {}

  @Input() inputLogin = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  show = false;

  users: User[] = [
    {
      id: '1',
      email: 'kem@gmail.com',
      createdAt: new Date(),
      deletedAt: null,
    },
  ];

  onHandleLogin() {
    if (!this.inputLogin.valid) {
      console.info(this.inputLogin.errors);
      return window.alert('Should set a valid email');
    }

    const userExist = this.users.find(
      (user) => user.email === this.inputLogin.value
    );
    if (userExist) {
      return this.router.navigate(['/todo']);
    }

    this.show = true;
  }

  closeModal() {
    this.show = false;
    return this.router.navigate(['/todo']);
  }
}
