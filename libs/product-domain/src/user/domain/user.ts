import { IBase, IOmitBase } from '@shared';

export interface User extends IBase {
  email: string;
}

export type UserCreateInput = Omit<User, IOmitBase>;
