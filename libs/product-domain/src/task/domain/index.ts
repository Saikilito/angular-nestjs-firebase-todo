import { IBase } from '../shared';

export interface Task extends IBase {
  title: string;
  description: string;
  checked: boolean;
}
