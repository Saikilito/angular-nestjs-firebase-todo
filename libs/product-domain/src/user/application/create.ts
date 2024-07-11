import { Errors } from '@shared';
import { UserRepository, UserCreateInput } from '../domain';

export const makeCreateUser =
  (userRepository: UserRepository) =>
  async ({ email }: UserCreateInput) => {
    const userExist = await userRepository.getByEmail({ email });

    if (userExist) {
      throw Errors.AlreadyExistError.create(
        `The user ${email} already exist`,
        'CREATE_USER_REPOSITORY'
      );
    }

    return userRepository.create({ email });
  };
