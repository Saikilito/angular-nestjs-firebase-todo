import { TaskRepository, TaskCreateInput } from '../domain';

export const makeCreate =
  (taskRepository: TaskRepository) => (input: TaskCreateInput) =>
    taskRepository.create(input);
