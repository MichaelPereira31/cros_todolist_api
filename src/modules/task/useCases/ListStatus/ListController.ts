import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListTaskUseCase } from './ListTaskUseCase';

export class ListTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { status } = request.query;
    const userId = request.user.id;

    const listTaskUseCase = container.resolve(ListTaskUseCase);

    const task = await listTaskUseCase.execute({ status, userId });

    return response.json(task);
  }
}
