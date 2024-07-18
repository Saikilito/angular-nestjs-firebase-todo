import { Infra } from '@product-domain/shared';
import { envConfig } from '../config/env-config';

export const jwtService = Infra.makeJwtService(envConfig.ENV_JWT_SECRET);
