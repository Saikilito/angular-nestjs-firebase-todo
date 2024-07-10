import { IOmitBase } from './base';
import { GetAllInput } from './infrastructure';

export type CreateEntityInput<E> = Omit<E, IOmitBase>;
export type UpdateEntityInput<E> = Omit<Partial<E>, IOmitBase>;

export interface IBaseRepository<T> {
  create(input: CreateEntityInput<T>): Promise<T>;
  getAll(input?: GetAllInput): Promise<T[]>;
  getById(id: number): Promise<T | null>;
  updateById(
    id: number,
    input: UpdateEntityInput<T>
  ): Promise<{ success: boolean }>;
  deleteById(id: number | number[]): Promise<{ success: boolean }>;
}
