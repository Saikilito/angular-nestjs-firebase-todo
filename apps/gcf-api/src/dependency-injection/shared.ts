import { db } from '../db/firestore-connection';
import { Infra as UserInfra } from '@product-domain/user';
import { Infra as TaskInfra } from '@product-domain/task';

export const taskRepository = TaskInfra.TaskFirebaseRepository(db);
export const userRepository = UserInfra.UserFirestoreRepository(db);
