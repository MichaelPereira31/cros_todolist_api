import { inject, injectable } from 'tsyringe';

import { IListDTO } from '@modules/task/dtos/IListDTO';
import { ITaskRepository } from '@modules/task/repositories/ITaskRepository';
import { Task } from '@prisma/client';

@injectable()
export class ListTaskUseCase {
  constructor(
    @inject('TaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute({ status, userId }: IListDTO): Promise<Task[]> {
    const tasks = await this.taskRepository.list({ status, userId });

    return tasks;
  }
}
