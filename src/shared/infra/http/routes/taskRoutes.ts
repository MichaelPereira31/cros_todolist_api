import { Router } from 'express';

import { CreateTaskController } from '@modules/task/useCases/create/CreateTaskController';
import createTaskSchema from '@modules/task/useCases/create/validation';
import { DeleteByIdTaskController } from '@modules/task/useCases/delete/DeleteByIdTaskController';
import { FindByIdTasController } from '@modules/task/useCases/findById/FindByIdUserController';
import { FindByStatusTaskController } from '@modules/task/useCases/findByStatus/FindByStatusController';
import { UpdateTaskController } from '@modules/task/useCases/update/UpdateUserController';
import updateTaskSchema from '@modules/task/useCases/update/validation';

import { validation } from '../middleware/validation';

const taskRoutes = Router();

const findByIdTaskController = new FindByIdTasController();
const findByStatusTaskController = new FindByStatusTaskController();
const createTaskController = new CreateTaskController();
const updateTaskController = new UpdateTaskController();
const deleteByIdTaskSchema = new DeleteByIdTaskController();

taskRoutes.get('/:id', findByIdTaskController.handle);
taskRoutes.get('/', findByStatusTaskController.handle);
taskRoutes.post('/', validation(createTaskSchema), createTaskController.handle);
taskRoutes.put(
  '/:id',
  validation(updateTaskSchema),
  updateTaskController.handle,
);
taskRoutes.delete('/:id', deleteByIdTaskSchema.handle);

export { taskRoutes };
