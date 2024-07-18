import { Errors } from '@shared';

import { AuthInput, RegisterInput } from '../domain';
import { UserRepository } from '../../user/domain';

type JWTService = {
  createToken: (payload: object) => string;
};

export const makeAuth =
  (userRepository: UserRepository, jwtService: JWTService) =>
  async ({ email }: AuthInput): Promise<string> => {
    const userExist = await userRepository.getByEmail({ email });

    if (!userExist) {
      throw Errors.ForbiddenError.create(
        `You don't have permission for access`,
        'AUTH_USE_CASE'
      );
    }

    return jwtService.createToken({ email });
  };

export const makeRegister =
  (userRepository: UserRepository, jwtService: JWTService) =>
  async ({ email }: RegisterInput): Promise<string> => {
    const userExist = await userRepository.getByEmail({ email });

    if (userExist) {
      throw Errors.AlreadyExistError.create(
        `User ${email} do can't be register`,
        'AUTH_USE_CASE'
      );
    }

    await userRepository.create({ email });

    return jwtService.createToken({ email });
  };
