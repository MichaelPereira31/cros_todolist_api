import { Router } from 'express';

import { taskRoutes } from './taskRoutes';
import { userRoutes } from './userRoutes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/task', taskRoutes);

export { routes };
