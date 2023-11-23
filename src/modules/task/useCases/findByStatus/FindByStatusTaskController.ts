import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindByStatusTaskUseCase } from './FindByStatusTaskUseCase';

export class FindByStatusTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { status } = request.query;
    const userId = request.user.id;

    const findByStatusTaskUseCase = container.resolve(FindByStatusTaskUseCase);

    const task = await findByStatusTaskUseCase.execute({ status, userId });

    return response.json(task);
  }
}
