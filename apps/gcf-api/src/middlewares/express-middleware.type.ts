import { NextFunction, Request, Response } from 'express';

export type ExpressHandlerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
