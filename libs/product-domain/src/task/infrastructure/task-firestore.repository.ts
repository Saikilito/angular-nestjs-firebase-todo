import { getFirestore } from 'firebase-admin/firestore';

import { Task, TaskRepository } from '../domain';
import { makeFirestoreRepository } from '../../shared/infrastructure';

export const TaskFirebaseRepository = (
  db: ReturnType<typeof getFirestore>
): TaskRepository => {
  const collection = 'task';

  const baseRepository = makeFirestoreRepository<Task>({
    collection,
    repository: db,
  });

  const firestore = db.collection(collection);

  return {
    ...baseRepository,

    create: async (input) => {
      const doc = await firestore.add({
        ...input,
        checked: false,
        createdAt: new Date().toISOString(),
        deletedAt: null,
      });

      return {
        id: doc.id,
        ...(await doc.get()).data(),
      } as Task;
    },
  };
};
