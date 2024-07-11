import { App } from '@product-domain/user';
import { userRepository } from './shared';

export const create = App.makeCreateUser(userRepository);
export const getByEmail = App.makeGetUserByEmail(userRepository);
