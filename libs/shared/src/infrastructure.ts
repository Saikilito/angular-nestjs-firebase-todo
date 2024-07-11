import { z } from 'zod';

import { Literal } from './basic-types';

export type WhereField = {
  field: string;
  value: Literal | Literal[];
};

export type GetAllInput = {
  sort?: string;
  where?: {
    fields?: Array<WhereField>;
  };
};

export const ValidateGetAllInputSchema = z
  .object({
    sort: z.enum(['ASC', 'DESC']).nullable(),
    where: z
      .object({
        fields: z.array(
          z.object({
            field: z.string(),
            value: z.any(),
          })
        ),
      })
      .nullable(),
  })
  .partial();
