import { Router } from 'express';

import { CreateTaskController } from '@modules/task/useCases/create/CreateTaskController';
import createTaskSchema from '@modules/task/useCases/create/validation';
import { DeleteByIdTaskController } from '@modules/task/useCases/delete/DeleteByIdTaskController';
import { FindByIdTaskController } from '@modules/task/useCases/findById/FindByIdTaskController';
import { ListTaskController } from '@modules/task/useCases/ListStatus/ListController';
import { UpdateTaskController } from '@modules/task/useCases/update/UpdateTaskController';
import updateTaskSchema from '@modules/task/useCases/update/validation';

import { isAuthenticate } from '../middleware/isAuthenticate';
import { validation } from '../middleware/validation';

const taskRoutes = Router();

const findByIdTaskController = new FindByIdTaskController();
const listTaskController = new ListTaskController();
const createTaskController = new CreateTaskController();
const updateTaskController = new UpdateTaskController();
const deleteByIdTaskSchema = new DeleteByIdTaskController();

taskRoutes.get('/:id', isAuthenticate, findByIdTaskController.handle);
taskRoutes.get('/', isAuthenticate, listTaskController.handle);
taskRoutes.post(
  '/',
  validation(createTaskSchema),
  isAuthenticate,
  createTaskController.handle,
);
taskRoutes.put(
  '/:id',
  validation(updateTaskSchema),
  isAuthenticate,
  updateTaskController.handle,
);
taskRoutes.delete('/:id', isAuthenticate, deleteByIdTaskSchema.handle);

export { taskRoutes };
