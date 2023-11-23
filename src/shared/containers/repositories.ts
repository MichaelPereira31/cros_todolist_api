import { container } from 'tsyringe';

import { TaskRepository } from '@modules/task/repositories/implementations/TaskRepository';
import { ITaskRepository } from '@modules/task/repositories/ITaskRepository';
import { UserRepository } from '@modules/user/repositories/implementations/UserRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<ITaskRepository>('TaskRepository', TaskRepository);
