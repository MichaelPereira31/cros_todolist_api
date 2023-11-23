import { inject, injectable } from 'tsyringe';

import { ITaskRepository } from '@modules/task/repositories/ITaskRepository';
import { AppError } from '@shared/infra/errors/AppError';

@injectable()
export class DeleteByIdTaskUseCase {
  constructor(
    @inject('TaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.taskRepository.findById(id);

    if (!user) throw new AppError('TASK_NOT_FOUND');

    await this.taskRepository.delete(id);
  }
}
