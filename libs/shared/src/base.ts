export interface IBase {
  id: string;
  createdAt: Date;
  deletedAt: Date | null;
}

export type IOmitBase = 'id' | 'createdAt' | 'deletedAt';
