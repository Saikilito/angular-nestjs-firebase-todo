/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { CONSTANTS } from '../../shared/constants';

export const authGuard: CanActivateFn = (_, __) => {
  const router = inject(Router);

  const existToken = localStorage.getItem(CONSTANTS.LOCAL_STORAGE.TOKEN);

  if (!existToken) {
    return router.createUrlTree([CONSTANTS.ROUTES.AUTH]);
  }

  return true;
};
