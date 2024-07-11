import { z } from 'zod';

export const validateEmailSchema = z.object({
  email: z.string().email(),
});

export const validateUserSchema = z.object({
  email: z.string().email(),
});
