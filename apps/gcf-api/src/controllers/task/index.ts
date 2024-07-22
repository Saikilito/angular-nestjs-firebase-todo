import { Request, Response } from 'express';

import { tryCatchAndNext } from '../../utils';
import { TaskUseCases } from '../../dependency-injection';

export const getAll = tryCatchAndNext(async (req: Request, res: Response) => {
  const input = req.query;
  const tasks = await TaskUseCases.getAll(input);
  res.json({ tasks });
});

export const create = tryCatchAndNext(async (req: Request, res: Response) => {
  const input = req.body;
  const task = await TaskUseCases.create(input);
  res.json({ task });
});

export const updateById = tryCatchAndNext(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const partial = req.body;
    const response = await TaskUseCases.updateById({ id, partial });
    res.json(response);
  }
);

export const deleteById = tryCatchAndNext(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await TaskUseCases.deleteById({ id });
    res.json(response);
  }
);
