import { ZodType } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { ExpressHandlerMiddleware } from './express-middleware.type';

type ValidationInput = {
  bodySchema?: ZodType | null;
  querySchema?: ZodType | null;
  paramsSchema?: ZodType | null;
};

type ValidateInputMiddleware = (
  input: ValidationInput
) => ExpressHandlerMiddleware;

export const validateInputMiddleware: ValidateInputMiddleware =
  ({ bodySchema, paramsSchema, querySchema }) =>
  (req: Request, _: Response, next: NextFunction) => {
    const errors = [];

    if (bodySchema) {
      const bodyResponse = bodySchema.safeParse(req.body);
      if (bodyResponse.error) {
        errors.push(bodyResponse.error);
      }
    }
    if (paramsSchema) {
      const paramsResponse = paramsSchema.safeParse(req.params);
      if (paramsResponse.error) {
        errors.push(paramsResponse.error);
      }
    }
    if (querySchema) {
      const queryResponse = querySchema.safeParse(req.query);
      if (queryResponse.error) {
        errors.push(queryResponse.error);
      }
    }
    if (errors.length) {
      throw errors;
    }

    return next();
  };
