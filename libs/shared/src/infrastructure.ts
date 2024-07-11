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
