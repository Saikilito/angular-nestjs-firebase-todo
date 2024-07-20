import { Route } from '@angular/router';

import { AppToDoComponent } from './todo.component';
import { authGuard } from '../../core/guard/auth.guard';

export const APP_TODO_ROUTES: Route[] = [
  {
    path: '',
    component: AppToDoComponent,
    canActivate: [authGuard],
  },
];
