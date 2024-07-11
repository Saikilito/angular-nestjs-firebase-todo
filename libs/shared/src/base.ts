export interface IBase {
  id: number;
  createdAt: Date;
  deletedAt: Date | null;
}

export type IOmitBase = 'id' | 'createdAt' | 'deletedAt';
