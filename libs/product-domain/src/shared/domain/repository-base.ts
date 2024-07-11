import { IOmitBase, GetAllInput } from '@shared';

export type CreateEntityInput<E> = Omit<E, IOmitBase>;
export type UpdateEntityInput<E> = Omit<Partial<E>, IOmitBase>;

export interface IBaseRepository<T> {
  create(input: CreateEntityInput<T>): Promise<T>;
  getAll(input?: GetAllInput): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  updateById(
    id: string,
    input: UpdateEntityInput<T>
  ): Promise<{ success: boolean }>;
  deleteById(id: string | string[]): Promise<{ success: boolean }>;
}
