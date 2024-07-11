import { z } from 'zod';

export const ValidateEmailSchema = z.object({
  email: z.string().email(),
});

export const ValidateUserSchema = z.object({
  email: z.string().email(),
});
