import { Router } from 'express';

import pingRoutes from './ping';
import userRoutes from './user';
import taskRoutes from './task';
import authRoutes from './auth';

const apiV1 = Router();

apiV1.use('/v1/users', userRoutes);
apiV1.use('/v1/tasks', taskRoutes);
apiV1.use('/v1/auth', authRoutes);
apiV1.use('/v1', pingRoutes);

export default apiV1;
