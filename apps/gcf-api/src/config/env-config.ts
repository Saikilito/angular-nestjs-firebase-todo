import { z } from 'zod';
import secrets from './secrets';

const envConfigSchema = z.object({
  ENV_JWT_SECRET: z.string(),
});

export const envConfig = envConfigSchema.parse(secrets);
