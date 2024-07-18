import { Infra as SharedInfra } from '@product-domain/shared';
import { Infra as UserInfra } from '@product-domain/user';
import { validateInputMiddleware } from '../middlewares';

const { ValidateEmailSchema } = SharedInfra;
const { ValidateUserSchema } = UserInfra;

export const validateGetByEmailParams = validateInputMiddleware({
  paramsSchema: ValidateEmailSchema,
});

export const validateCreateUserInput = validateInputMiddleware({
  bodySchema: ValidateUserSchema,
});
