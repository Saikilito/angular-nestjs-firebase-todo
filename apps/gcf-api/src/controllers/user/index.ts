import { Request, Response } from 'express';

import { CONSTANTS } from '@shared';
import { tryCatchAndNext } from '../../utils';
import { UserUseCases } from '../../dependency-injection';

const { HTTP_STATUS_CODE } = CONSTANTS;

export const getByEmail = tryCatchAndNext(
  async (req: Request, res: Response) => {
    const { email } = req.params;
    const user = await UserUseCases.getByEmail({ email });
    res.json({ user });
  }
);

export const create = tryCatchAndNext(async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await UserUseCases.create({ email });
  res.status(HTTP_STATUS_CODE.CREATED).json({ user });
});
