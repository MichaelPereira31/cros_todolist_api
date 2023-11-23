import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTaskUseCase } from './CreateTaskUseCase';

export class CreateTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createTaskUseCase = container.resolve(CreateTaskUseCase);

    const user = await createTaskUseCase.execute(data);

    return response.json(user);
  }
}
