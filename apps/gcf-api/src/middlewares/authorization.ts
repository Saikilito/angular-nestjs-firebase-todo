import { Errors } from '@shared';
import { Request, Response, NextFunction } from 'express';

import { ExpressHandlerMiddleware } from './express-middleware.type';
import { Services } from '../dependency-injection';

type AuthorizationMiddleware = ExpressHandlerMiddleware;

export const authorizationMiddleware: AuthorizationMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const path = 'AUTHORIZATION_MIDDLEWARE';
  try {
    const jwtToken = req.headers['authorization'] || false;

    if (!jwtToken) {
      throw Errors.UnauthorizeError.create('Token is not valid', path);
    }

    const [type, token] = jwtToken.split(' ');
    if (!type || type.toLowerCase() !== 'bearer' || !token) {
      throw Errors.UnauthorizeError.create('Token is not valid', path);
    }

    const decode = Services.jwtService.verifyToken(token);

    if (!decode) {
      throw Errors.UnauthorizeError.create('Token is not valid', path);
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
