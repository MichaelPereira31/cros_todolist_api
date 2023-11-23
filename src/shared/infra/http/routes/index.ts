import { Router } from 'express';

import { authRoutes } from './authRoutes';
import { taskRoutes } from './taskRoutes';
import { userRoutes } from './userRoutes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/task', taskRoutes);
routes.use('/auth', authRoutes);

export { routes };
