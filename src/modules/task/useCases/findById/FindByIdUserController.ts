import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindByIdTaskUseCase } from './FindByIdTaskUseCase';

export class FindByIdTasController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findByIdTaskUseCase = container.resolve(FindByIdTaskUseCase);

    const user = await findByIdTaskUseCase.execute(id);

    return response.json(user);
  }
}
