import { z } from 'zod';

export const ValidateIdSchema = z.object({
  id: z.string(),
});
