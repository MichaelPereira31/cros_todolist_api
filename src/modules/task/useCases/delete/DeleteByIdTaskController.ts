import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteByIdTaskUseCase } from './DeleteByIdTaskUseCase';

export class DeleteByIdTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteByIdTaskUseCase = container.resolve(DeleteByIdTaskUseCase);

    await deleteByIdTaskUseCase.execute(id);

    return response.sendStatus(200);
  }
}
