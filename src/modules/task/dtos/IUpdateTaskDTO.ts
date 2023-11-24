import { StatusTask } from '@prisma/client';

export type IUpdateTaskDTO = {
  id: string;
  title?: string;
  description?: string;
  status?: StatusTask;
  parentId?: string;
  userId: string;
};
