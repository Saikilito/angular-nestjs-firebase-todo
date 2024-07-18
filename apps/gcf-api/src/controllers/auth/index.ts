import { Request, Response } from 'express';

import { CONSTANTS } from '@shared';
import { tryCatchAndNext } from '../../utils';
import { AuthUseCases } from '../../dependency-injection';

const { HTTP_STATUS_CODE } = CONSTANTS;

export const auth = tryCatchAndNext(async (req: Request, res: Response) => {
  const { email } = req.body;

  const token = await AuthUseCases.authorized({ email });
  res.json({ token });
});

export const register = tryCatchAndNext(async (req: Request, res: Response) => {
  const { email } = req.body;

  const token = await AuthUseCases.register({ email });
  res.status(HTTP_STATUS_CODE.CREATED).json({ token });
});
