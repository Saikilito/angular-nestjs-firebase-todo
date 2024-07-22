import { z } from 'zod';

import { Literal } from './basic-types';
import { BadRequestError } from './errors';

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
    sort: z
      .string()
      .transform((str) => {
        const schema = z.enum(['asc', 'desc']);

        const [field, sort] = str.split(':');

        if (!field || !sort) {
          throw BadRequestError.create(
            'Sort should have the follow form field:sort'
          );
        }

        schema.parse(sort);

        return str;
      })
      .nullable(),
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
