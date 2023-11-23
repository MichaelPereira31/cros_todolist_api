import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindByStatusTaskUseCase } from './FindByStatusTaskUseCase';

export class FindByStatusTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { status } = request.query;

    const findByStatusTaskUseCase = container.resolve(FindByStatusTaskUseCase);

    const task = await findByStatusTaskUseCase.execute(status);

    return response.json(task);
  }
}
