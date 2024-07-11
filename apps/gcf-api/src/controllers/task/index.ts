import { Request, Response } from 'express';
import { taskUseCases } from '../../dependency-injection';

export const getAll = (req: Request, res: Response) => {
  const input = req.body;
  const tasks = taskUseCases.getAll(input);
  res.json({ tasks });
};

export const create = (req: Request, res: Response) => {
  const input = req.body;
  const task = taskUseCases.create(input);
  res.json({ task });
};

export const updateById = (req: Request, res: Response) => {
  const { id } = req.params;
  const partial = req.body;
  const response = taskUseCases.updateById({ id, partial });
  res.json(response);
};

export const deleteById = (req: Request, res: Response) => {
  const { id } = req.params;
  const response = taskUseCases.deleteById({ id });
  res.json(response);
};
