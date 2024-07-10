import { Router } from 'express';
import pingRoutes from './ping';

const apiV1 = Router();

const routes = [pingRoutes];

apiV1.use('/v1', routes);

export default apiV1;
