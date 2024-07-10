import { firestoreConnection } from './firestore/firestore-connection';
import { repository } from './firestore/firestore-repository';

export const firestore = {
  connection: firestoreConnection,
  repository,
};
