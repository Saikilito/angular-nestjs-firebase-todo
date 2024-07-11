import { z } from 'zod';

export const ValidateTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const ValidateTaskPartialSchema = ValidateTaskSchema.partial();
