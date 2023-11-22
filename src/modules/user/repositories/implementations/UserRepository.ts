import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '@modules/user/dtos/IUpdateUserDTO';
import { User } from '@prisma/client';
import { prismaClient } from '@shared/infra/database/prisma';

import { IUserRepository } from '../IUserRepository';

export class UserRepository implements IUserRepository {
  constructor(private readonly ctx = { prisma: prismaClient }) {}

  async create(params: ICreateUserDTO): Promise<User> {
    const user = await this.ctx.prisma.user.create({ data: params });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.ctx.prisma.user.findUnique({ where: { id } });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.ctx.prisma.user.findUnique({ where: { email } });

    return user;
  }

  async update({ id, password, name }: IUpdateUserDTO): Promise<User> {
    const user = await this.ctx.prisma.user.update({
      where: { id },
      data: { password, name },
    });

    return user;
  }

  async delete(id: string): Promise<void> {
    await this.ctx.prisma.user.delete({ where: { id } });
  }
}
