import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindByIdUserUseCase } from './FindByIdUserUseCase';

export class FindByIdUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findByIdUserUseCase = container.resolve(FindByIdUserUseCase);

    const user = await findByIdUserUseCase.execute(id);

    return response.json(user);
  }
}
