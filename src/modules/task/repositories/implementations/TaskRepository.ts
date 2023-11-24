import { ICreateTaskDTO } from '@modules/task/dtos/ICreateTaskDTO';
import { IListDTO } from '@modules/task/dtos/IListDTO';
import { IUpdateTaskDTO } from '@modules/task/dtos/IUpdateTaskDTO';
import { Task } from '@prisma/client';
import { prismaClient } from '@shared/infra/database/prisma';

import { ITaskRepository } from '../ITaskRepository';

export class TaskRepository implements ITaskRepository {
  constructor(private readonly ctx = { prisma: prismaClient }) {}

  async create(data: ICreateTaskDTO): Promise<Task> {
    const task = await this.ctx.prisma.task.create({ data });
    return task;
  }

  async findById(id: string): Promise<Task | null> {
    const task = await this.ctx.prisma.task.findUnique({
      where: { id },
      include: { parentTask: true, subtasks: true },
    });

    return task;
  }

  async list({ status, userId }: IListDTO): Promise<Task[]> {
    const task = await this.ctx.prisma.task.findMany({
      where: {
        status,
        userId,
      },
      include: { parentTask: true, subtasks: true },
    });

    return task;
  }

  async update({
    id,
    status,
    description,
    title,
    parentId,
  }: IUpdateTaskDTO): Promise<Task> {
    const task = await this.ctx.prisma.task.update({
      where: { id },
      data: { status, description, title, parentId },
    });

    return task;
  }

  async delete(id: string): Promise<void> {
    await this.ctx.prisma.task.delete({ where: { id } });
  }
}
