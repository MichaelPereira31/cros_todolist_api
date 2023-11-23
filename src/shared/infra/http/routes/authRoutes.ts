import { Router } from 'express';

import { AuthenticateController } from '@modules/auth/useCases/authenticated/AuthenticateController';
import authenticateSchema from '@modules/auth/useCases/authenticated/validation';

import { validation } from '../middleware/validation';

const authRoutes = Router();

const authenticateController = new AuthenticateController();

authRoutes.post(
  '/',
  validation(authenticateSchema),
  authenticateController.handle,
);

export { authRoutes };
