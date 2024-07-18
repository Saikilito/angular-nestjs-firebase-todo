import { Infra } from '@product-domain/shared';
import { validateInputMiddleware } from '../middlewares';

const { ValidateEmailSchema } = Infra;

export const validateBodyEmail = validateInputMiddleware({
  bodySchema: ValidateEmailSchema,
});
