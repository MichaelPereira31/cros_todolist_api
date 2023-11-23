import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindByIdTaskUseCase } from './FindByIdTaskUseCase';

export class FindByIdTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findByIdTaskUseCase = container.resolve(FindByIdTaskUseCase);

    const task = await findByIdTaskUseCase.execute(id);

    return response.json(task);
  }
}
