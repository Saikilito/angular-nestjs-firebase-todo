import { TaskRepository, TaskUpdateInput } from '../domain';

type Input = {
  id: string;
  partial: TaskUpdateInput;
};

export const makeUpdateById =
  (taskRepository: TaskRepository) =>
  ({ id, partial }: Input) =>
    taskRepository.updateById(id, partial);
