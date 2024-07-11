import { getFirestore } from 'firebase-admin/firestore';

import { WhereField } from '@shared';

import { IBaseRepository } from '../domain';

type FirestoreRepository = {
  repository: ReturnType<typeof getFirestore>;
  collection: string;
};

export const makeFirestoreRepository = <T>({
  repository,
  collection,
}: FirestoreRepository): IBaseRepository<T> => {
  const firestore = repository.collection(collection);
  return {
    async getAll(input) {
      let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
        firestore;

      if (input?.where?.fields) {
        input.where.fields.forEach((field: WhereField) => {
          if (Array.isArray(field.value)) {
            query = query.where(field.field, 'in', field.value);
          } else {
            query = query.where(field.field, '==', field.value);
          }
        });
      }

      if (input?.sort) {
        query = query.orderBy(input.sort);
      }

      const snapshot = await query.get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[];
    },
    getById: async (id: string) => {
      const doc = await firestore.doc(id).get();
      return doc.exists ? ({ id: doc.id, ...doc.data() } as T) : null;
    },
    async create(input) {
      const doc = await firestore.add({
        ...input,
        createdAt: new Date().toISOString(),
        deletedAt: null,
      });

      return {
        id: doc.id,
        ...(await doc.get()).data(),
      } as T;
    },
    updateById: async (id: string, partial: Partial<T>) => {
      try {
        await firestore.doc(id).update({ ...partial, id });
        return { success: true };
      } catch (error) {
        console.error('Error updating: ', error);
        return { success: false };
      }
    },
    deleteById: async (id: string) => {
      try {
        await firestore.doc(id).delete();
        return { success: true };
      } catch (error) {
        console.error('Error deleting: ', error);
        return { success: false };
      }
    },
  };
};
