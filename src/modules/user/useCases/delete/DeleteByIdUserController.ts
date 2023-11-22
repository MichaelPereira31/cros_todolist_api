import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteByIdUserUseCase } from './DeleteByIdUserUseCase';

export class DeleteByIdUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteByIdUserUseCase = container.resolve(DeleteByIdUserUseCase);

    await deleteByIdUserUseCase.execute(id);

    return response.sendStatus(200);
  }
}
