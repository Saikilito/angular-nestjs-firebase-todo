import { GetAllInput } from '@shared';
import { TaskRepository } from '../domain';

export const makeGetAll =
  (taskRepository: TaskRepository) => (input: GetAllInput) =>
    taskRepository.getAll(input);
