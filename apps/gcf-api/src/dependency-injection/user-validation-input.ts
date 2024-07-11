import { Infra } from '@product-domain/user';
import { validateInputMiddleware } from '../middleware';

const {
  ValidateEmailSchema: validateEmailSchema,
  ValidateUserSchema: validateUserSchema,
} = Infra;

export const validateGetByEmailParams = validateInputMiddleware({
  paramsSchema: validateEmailSchema,
});

export const validateCreateUserInput = validateInputMiddleware({
  bodySchema: validateUserSchema,
});
