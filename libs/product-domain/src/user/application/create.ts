import { UserRepository, UserCreateInput } from '../domain';

export const makeCreateUser =
  (userRepository: UserRepository) =>
  async ({ email }: UserCreateInput) => {
    const userExist = await userRepository.getByEmail({ email });

    if (userExist) {
      // TODO: Change for 404 error
      throw new Error(`The user ${email} already exist`);
    }

    return userRepository.create({ email });
  };
