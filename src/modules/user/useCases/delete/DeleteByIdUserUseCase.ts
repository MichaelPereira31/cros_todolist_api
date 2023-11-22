import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/infra/errors/AppError';

@injectable()
export class DeleteByIdUserUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new AppError('USER_NOT_FOUND');

    await this.userRepository.delete(id);
  }
}
