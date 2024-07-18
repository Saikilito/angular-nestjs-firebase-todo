import { Router } from 'express';

import { authorizationMiddleware } from '../../middlewares';
import { UserController } from '../../controllers';
import { UserValidation } from '../../dependency-injection';

const userRouter = Router();

userRouter.get(
  '/:email',
  authorizationMiddleware,
  UserValidation.validateGetByEmailParams,
  UserController.getByEmail
);

userRouter.post(
  '/',
  authorizationMiddleware,
  UserValidation.validateCreateUserInput,
  UserController.create
);

export default userRouter;
