import { inject, injectable } from 'tsyringe';

import { ITaskRepository } from '@modules/task/repositories/ITaskRepository';
import { Task } from '@prisma/client';
import { AppError } from '@shared/infra/errors/AppError';

@injectable()
export class FindByStatusTaskUseCase {
  constructor(
    @inject('TaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(status: unknown): Promise<Task[]> {
    const tasks = await this.taskRepository.findByStatus(status as string);

    if (tasks.length === 0) throw new AppError('TASKS_NOT_FOUND');

    return tasks;
  }
}
