import { IBase, IOmitBase } from '@shared';

export interface Task extends IBase {
  title: string;
  description: string;
  checked: boolean;
}

export type TaskCreateInput = Omit<Task, IOmitBase>;
export type TaskUpdateInput = Omit<Partial<Task>, IOmitBase>;
