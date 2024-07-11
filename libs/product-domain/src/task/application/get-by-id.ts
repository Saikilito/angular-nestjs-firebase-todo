import { TaskRepository } from '../domain';

type Input = { id: string };

export const makeGetById =
  (taskRepository: TaskRepository) =>
  ({ id }: Input) =>
    taskRepository.getById(id);
