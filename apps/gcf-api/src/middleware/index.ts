import { ZodType } from 'zod';
import { NextFunction, Request, Response } from 'express';

type ValidationInput = {
  bodySchema?: ZodType | null;
  querySchema?: ZodType | null;
  paramsSchema?: ZodType | null;
};

export const validateInputMiddleware =
  ({ bodySchema, paramsSchema, querySchema }: ValidationInput) =>
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
      // TODO: Handle for 400 BAD REQUEST ERROR
      throw errors;
    }

    return next();
  };
