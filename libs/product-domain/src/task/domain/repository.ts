import { Task } from '../../task/domain';
import { IBaseRepository } from '../../shared/domain';

export type TaskRepository = IBaseRepository<Task>;
