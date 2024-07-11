import { App } from '@product-domain/task';
import { taskRepository } from './shared';

export const create = App.makeCreate(taskRepository);
export const getAll = App.makeGetAll(taskRepository);
export const getById = App.makeGetById(taskRepository);
export const updateById = App.makeUpdateById(taskRepository);
export const deleteById = App.makeDeleteById(taskRepository);
