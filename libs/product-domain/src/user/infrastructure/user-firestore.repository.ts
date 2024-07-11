import { getFirestore } from 'firebase-admin/firestore';

import { User, UserRepository } from '../domain';
import { makeFirestoreRepository } from '../../shared/infrastructure/firestore-base.repository';

export const UserFirestoreRepository = (
  db: ReturnType<typeof getFirestore>
): UserRepository => {
  const collection = 'user';

  const baseRepository = makeFirestoreRepository<User>({
    collection,
    repository: db,
  });

  const firestore = db.collection(collection);

  return {
    ...baseRepository,

    create: async (input) => {
      const doc = await firestore.add({
        ...input,
        createdAt: new Date().toISOString(),
        deletedAt: null,
      });

      return ((await doc.get()).data() as User) ?? null;
    },

    getByEmail: async ({ email }) => {
      const snapshot = await firestore.where('email', '==', email).get();

      if (snapshot.empty) {
        return null;
      }

      const [doc] = snapshot.docs;
      return doc.data() as User;
    },
  };
};
