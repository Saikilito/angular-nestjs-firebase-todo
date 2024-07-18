import { z } from 'zod';

export const ValidateIdSchema = z.object({
  id: z.string(),
});

export const ValidateEmailSchema = z.object({
  email: z.string().email(),
});
