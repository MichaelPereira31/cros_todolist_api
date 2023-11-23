import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTaskUseCase } from './CreateTaskUseCase';

export class CreateTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const userId = request.user.id;

    const createTaskUseCase = container.resolve(CreateTaskUseCase);

    const task = await createTaskUseCase.execute({ ...data, userId });

    return response.json(task);
  }
}
