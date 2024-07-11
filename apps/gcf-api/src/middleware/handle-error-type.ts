import { ZodError } from 'zod';
import { match } from 'ts-pattern';
import { Request, Response, NextFunction } from 'express';

import { Errors } from '@shared';
import { zodMapError, zodMapErrors } from '../utils';

type CustomError<T extends string> = Errors.CustomError<T>;

type ErrorTypes<T extends string> =
  | Error
  | Errors.CustomError<T>
  | ZodError
  | Array<ZodError>;

function isCustomError<T extends string>(error: ErrorTypes<T>): boolean {
  return Object(error as Errors.CustomError<T>).hasOwnProperty.call(
    error,
    'issuedAt'
  );
}

function isZodError<T extends string>(error: ErrorTypes<T>): boolean {
  return error instanceof ZodError;
}

function isArrayOfZodError<T extends string>(error: ErrorTypes<T>): boolean {
  return Array.isArray(error) && error.every((err) => err instanceof ZodError);
}

export const handleErrorTypeMiddleware = <T extends string>(
  error: ErrorTypes<T>,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  const errorObject = match(error)
    .returnType<Errors.ObjectError>()
    .when(isCustomError, (customError: CustomError<T>) => {
      return customError.toJSON();
    })
    .when(isZodError, (zodError: ZodError) => {
      const { message, path } = zodMapError(zodError);
      return Errors.BadRequestError.create(message, path).toJSON();
    })
    .when(isArrayOfZodError, (zodErrors: Array<ZodError>) => {
      const { message, path } = zodMapErrors(zodErrors);
      return Errors.BadRequestError.create(message, path).toJSON();
    })
    .otherwise((error: Error) => ({
      ok: false,
      statusCode: 500,
      code: error.name,
      path: 'Unknown path error',
      message: error.message || 'Something went wrong',
      issuedAt: new Date().toISOString(),
    }));

  return res.status(errorObject.statusCode).json(errorObject);
};
