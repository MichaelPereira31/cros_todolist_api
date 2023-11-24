import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateTaskUseCase } from './UpdateTaskUseCase';

export class UpdateTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const data = request.body;
    const userId = request.user.id;

    const updateTaskUseCase = container.resolve(UpdateTaskUseCase);

    const task = await updateTaskUseCase.execute({ id, ...data, userId });

    return response.json(task);
  }
}
