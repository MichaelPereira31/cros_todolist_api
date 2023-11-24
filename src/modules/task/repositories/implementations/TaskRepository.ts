import { ICreateTaskDTO } from '@modules/task/dtos/ICreateTaskDTO';
import { IFindByStatusDTO } from '@modules/task/dtos/IFindByStatusDTO';
import { IFindTaskDTO } from '@modules/task/dtos/IFindTaskDTO';
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

  async findByStatus({ status, userId }: IFindByStatusDTO): Promise<Task[]> {
    const task = await this.ctx.prisma.task.findMany({
      where: {
        status,
        userId,
      },
      include: { parentTask: true, subtasks: true },
    });

    return task;
  }

  async find({ description, title }: IFindTaskDTO): Promise<boolean> {
    const task = await this.ctx.prisma.task.findFirst({
      where: {
        title: { equals: title },
        description: { equals: description },
      },
    });

    return !!task;
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
