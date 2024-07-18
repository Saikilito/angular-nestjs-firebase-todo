import { Router } from 'express';

import { AuthController } from '../../controllers';
import { AuthValidation } from '../../dependency-injection';

const authRouter = Router();

authRouter.post(
  '/login',
  AuthValidation.validateBodyEmail,
  AuthController.auth
);

authRouter.post(
  '/register',
  AuthValidation.validateBodyEmail,
  AuthController.register
);

export default authRouter;
