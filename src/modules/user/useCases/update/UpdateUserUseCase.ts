import { inject, injectable } from 'tsyringe';
import { encrypt } from 'util/encrypt';

import { IUpdateUserDTO } from '@modules/user/dtos/IUpdateUserDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { User } from '@prisma/client';
import { AppError } from '@shared/infra/errors/AppError';

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ id, password, name }: IUpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new AppError('USER_NOT_FOUND');

    await this.userRepository.update({
      id,
      password: password ? encrypt({ password }) : undefined,
      name,
    });

    return user;
  }
}
