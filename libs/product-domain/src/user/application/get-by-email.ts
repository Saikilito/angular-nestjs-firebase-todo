import { Errors } from '@shared';
import { UserRepository } from '../domain';

type Input = { email: string };

export const makeGetUserByEmail =
  (userRepository: UserRepository) =>
  async ({ email }: Input) => {
    const user = await userRepository.getByEmail({ email });

    if (!user) {
      throw Errors.NotFoundResourceError.create(
        'User not found',
        'USER_REPOSITORY'
      );
    }

    return user;
  };
