import { ValidateGetAllInputSchema } from '@shared';
import { Infra as TaskInfra } from '@product-domain/task';
import { Infra as SharedInfra } from '@product-domain/shared';
import { validateInputMiddleware } from '../middlewares';

const { ValidateIdSchema } = SharedInfra;
const { ValidateTaskSchema, ValidateTaskPartialSchema } = TaskInfra;

export const validateGetAllQuery = validateInputMiddleware({
  querySchema: ValidateGetAllInputSchema,
});

export const validateCreateTaskInput = validateInputMiddleware({
  bodySchema: ValidateTaskSchema,
});

export const validateTaskPartialInput = validateInputMiddleware({
  paramsSchema: ValidateIdSchema,
  bodySchema: ValidateTaskPartialSchema,
});

export const validateIdParams = validateInputMiddleware({
  paramsSchema: ValidateIdSchema,
});
