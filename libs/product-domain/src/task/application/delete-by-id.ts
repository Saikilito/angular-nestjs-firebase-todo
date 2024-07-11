import { TaskRepository } from '../domain';

type Input = {
  id: string;
};

export const makeDeleteById =
  (taskRepository: TaskRepository) =>
  ({ id }: Input) =>
    taskRepository.deleteById(id);
