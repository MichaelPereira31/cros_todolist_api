import { Task } from '@prisma/client';

import { ICreateTaskDTO } from '../dtos/ICreateTaskDTO';
import { IFindTaskDTO } from '../dtos/IFindTaskDTO';
import { IUpdateTaskDTO } from '../dtos/IUpdateTaskDTO';

export interface ITaskRepository {
  create(params: ICreateTaskDTO): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  findByStatus(status: unknown): Promise<Task[]>;
  find(params: IFindTaskDTO): Promise<boolean>;
  update(params: IUpdateTaskDTO): Promise<Task>;
  delete(id: string): Promise<void>;
}
