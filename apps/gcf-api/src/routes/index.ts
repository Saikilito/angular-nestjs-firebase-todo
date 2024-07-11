import { Router } from 'express';

import pingRoutes from './ping';
import userRoutes from './user';
import taskRoutes from './task';

const apiV1 = Router();

apiV1.use('/v1/users', userRoutes);
apiV1.use('/v1/tasks', taskRoutes);
apiV1.use('/v1', pingRoutes);

export default apiV1;
