import { Task } from '@prisma/client';

import { ICreateTaskDTO } from '../dtos/ICreateTaskDTO';
import { IListDTO } from '../dtos/IListDTO';
import { IUpdateTaskDTO } from '../dtos/IUpdateTaskDTO';

export interface ITaskRepository {
  create(params: ICreateTaskDTO): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  list(params: IListDTO): Promise<Task[]>;
  update(params: IUpdateTaskDTO): Promise<Task>;
  delete(id: string): Promise<void>;
}
