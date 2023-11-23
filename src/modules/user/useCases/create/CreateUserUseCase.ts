import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { User } from '@prisma/client';
import { AppError } from '@shared/infra/errors/AppError';
import { encrypt } from '@shared/util/encrypt';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ email, password, name }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) throw new AppError('USER_ALREADY_EXISTS');

    const user = await this.userRepository.create({
      email,
      password: encrypt({ password }),
      name,
    });

    return user;
  }
}
