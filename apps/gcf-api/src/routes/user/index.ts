import { Router } from 'express';

import { UserController } from '../../controllers';
import { UserValidation } from '../../dependency-injection';

const userRouter = Router();

userRouter.get(
  '/:email',
  UserValidation.validateGetByEmailParams,
  UserController.getByEmail
);

userRouter.post(
  '/',
  UserValidation.validateCreateUserInput,
  UserController.create
);

export default userRouter;
