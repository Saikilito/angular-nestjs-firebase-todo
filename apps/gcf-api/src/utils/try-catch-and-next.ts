import { NextFunction, Request, Response } from 'express';

export const tryCatchAndNext =
  (cb: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
