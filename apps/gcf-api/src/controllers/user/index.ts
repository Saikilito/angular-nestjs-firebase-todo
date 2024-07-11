import { Request, Response } from 'express';
import { userUseCases } from '../../dependency-injection';

export const getByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  const user = userUseCases.getByEmail({ email });
  res.json({ user });
};

export const create = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = userUseCases.create({ email });
  res.json({ user });
};
