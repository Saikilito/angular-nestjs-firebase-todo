import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((r) => r.AUTH_ROUTES),
  },
  {
    path: 'todo',
    loadChildren: () =>
      import('./pages/todo/todo.routes').then((t) => t.APP_TODO_ROUTES),
  },
];
