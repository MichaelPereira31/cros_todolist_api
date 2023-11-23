import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { encrypt } from 'util/encrypt';

import authConfig from '@config/auth';
import { IAuthenticateDTO } from '@modules/auth/dtos/IAuthenticateDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/infra/errors/AppError';

@injectable()
export class AuthenticateUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute({ password, email }: IAuthenticateDTO) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError(`USER_NOT_FOUND`, 404);

    const encrypted = encrypt({
      password,
      ivEncrypt: user.password.split('-')[0],
    });

    if (encrypted !== user.password) {
      throw new AppError('ERROR_AUTHENTICATING', 401);
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      authConfig.jwt.secret,
      {
        expiresIn: authConfig.jwt.expiresIn,
      },
    );

    return {
      token,
      userId: user.id,
    };
  }
}
