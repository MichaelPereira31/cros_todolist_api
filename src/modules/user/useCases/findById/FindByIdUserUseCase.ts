import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { User } from '@prisma/client';
import { AppError } from '@shared/infra/errors/AppError';

@injectable()
export class FindByIdUserUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new AppError('USER_NOT_FOUND');

    return user;
  }
}
