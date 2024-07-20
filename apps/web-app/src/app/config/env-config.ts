import { z } from 'zod';
import secrets from './secrets';

const envConfigSchema = z.object({
  SERVER_URL: z.string(),
});

export const envConfig = envConfigSchema.parse(secrets);
