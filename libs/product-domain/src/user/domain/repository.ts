import { User } from '.';
import { Domain } from '../../shared';

export type UserRepository = Domain.IBaseRepository<User> & {
  getByEmail: (input: { email: string }) => Promise<User | null>;
};
