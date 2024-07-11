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

  return {
    ...baseRepository,
  };
};
