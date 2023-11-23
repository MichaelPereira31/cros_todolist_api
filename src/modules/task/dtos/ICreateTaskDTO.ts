import { StatusTask } from '@prisma/client';

export type ICreateTaskDTO = {
  title: string;
  description: string;
  status: StatusTask;
  userId: string;
  parentId?: string;
};
