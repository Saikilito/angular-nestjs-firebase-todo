import { z } from 'zod';

export const ValidateUserSchema = z.object({
  email: z.string().email(),
});
