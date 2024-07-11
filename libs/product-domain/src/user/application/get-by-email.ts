import { UserRepository } from '../domain';

type Input = { email: string };

export const makeGetUserByEmail =
  (userRepository: UserRepository) =>
  ({ email }: Input) =>
    userRepository.getByEmail({ email });
