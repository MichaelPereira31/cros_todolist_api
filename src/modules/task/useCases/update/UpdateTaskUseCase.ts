import { inject, injectable } from 'tsyringe';

import { IUpdateTaskDTO } from '@modules/task/dtos/IUpdateTaskDTO';
import { ITaskRepository } from '@modules/task/repositories/ITaskRepository';
import { Task } from '@prisma/client';
import { AppError } from '@shared/infra/errors/AppError';

@injectable()
export class UpdateTaskUseCase {
  constructor(
    @inject('TaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute({
    id,
    status,
    description,
    title,
  }: IUpdateTaskDTO): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (!task) throw new AppError('USER_NOT_FOUND');

    const updatedTask = await this.taskRepository.update({
      id,
      status,
      description,
      title,
    });

    return updatedTask;
  }
}
