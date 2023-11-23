import { Router } from 'express';

import { CreateUserController } from '@modules/user/useCases/create/CreateUserController';
import createUserSchema from '@modules/user/useCases/create/validation';
import { DeleteByIdUserController } from '@modules/user/useCases/delete/DeleteByIdUserController';
import { FindByIdUserController } from '@modules/user/useCases/findById/FindByIdUserController';
import { UpdateUserController } from '@modules/user/useCases/update/UpdateUserController';
import updateUserSchema from '@modules/user/useCases/update/validation';

import { isAuthenticate } from '../middleware/isAuthenticate';
import { validation } from '../middleware/validation';

const userRoutes = Router();

const findByIdUserController = new FindByIdUserController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteByIdUserController = new DeleteByIdUserController();

userRoutes.get('/', isAuthenticate, findByIdUserController.handle);
userRoutes.post('/', validation(createUserSchema), createUserController.handle);
userRoutes.put(
  '/',
  validation(updateUserSchema),
  isAuthenticate,
  updateUserController.handle,
);
userRoutes.delete('/', isAuthenticate, deleteByIdUserController.handle);

export { userRoutes };
