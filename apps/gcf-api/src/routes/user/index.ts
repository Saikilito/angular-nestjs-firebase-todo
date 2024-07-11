import { Router } from 'express';

import { Infra } from '@product-domain/user';

import { UserController } from '../../controllers';
import { validateInputMiddleware } from '../../middleware';

const { validateEmailSchema, validateUserSchema } = Infra;

const userRouter = Router();

userRouter.get(
  '/:email',
  validateInputMiddleware({
    paramsSchema: validateEmailSchema,
  }),
  UserController.getByEmail
);

userRouter.post(
  '/',
  validateInputMiddleware({
    bodySchema: validateUserSchema,
  }),
  UserController.create
);

export default userRouter;
