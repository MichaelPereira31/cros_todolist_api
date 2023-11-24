import { inject, injectable } from 'tsyringe';

import { ICreateTaskDTO } from '@modules/task/dtos/ICreateTaskDTO';
import { ITaskRepository } from '@modules/task/repositories/ITaskRepository';
import { Task } from '@prisma/client';
import { AppError } from '@shared/infra/errors/AppError';

@injectable()
export class CreateTaskUseCase {
  constructor(
    @inject('TaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute({
    description,
    title,
    status,
    userId,
    parentId,
  }: ICreateTaskDTO): Promise<Task> {
    const taskAlreadyExists = await this.taskRepository.find({
      description,
      title,
    });

    if (taskAlreadyExists) throw new AppError('TASK_ALREADY_EXISTS');

    if (parentId) {
      await this.taskRepository.findById(parentId).catch(() => {
        throw new AppError('PARENT_TASK_ALREADY_EXISTS');
      });
    }

    const task = await this.taskRepository.create({
      description,
      title,
      status,
      userId,
    });

    await this.taskRepository.update({
      id: parentId,
      parentId: task.id,
      userId,
    });

    return task;
  }
}
