import { App } from '@product-domain/auth';

import { jwtService } from './services';
import { userRepository } from './shared';

export const authorized = App.makeAuth(userRepository, jwtService);
export const register = App.makeRegister(userRepository, jwtService);
