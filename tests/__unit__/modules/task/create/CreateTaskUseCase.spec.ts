import { ITaskRepository } from '@modules/task/repositories/ITaskRepository';
import { CreateTaskUseCase } from '@modules/task/useCases/create/CreateTaskUseCase';
import { StatusTask } from '@prisma/client';

interface ISutTypes {
  sut: (taskRepository: ITaskRepository) => CreateTaskUseCase;
}

const makeSut = (): ISutTypes => {
  const sut = (taskRepository: ITaskRepository) =>
    new CreateTaskUseCase(taskRepository);

  return { sut };
};

const httpRequestMock = () => ({
  description: 'any_description',
  title: 'any_title',
  status: StatusTask.cancelada,
  userId: 'any_user_id',
  parentId: 'any_parent_id',
});

const taskMock = {
  id: 'any_id',
  description: 'any_description',
  title: 'any_title',
  status: StatusTask.cancelada,
  userId: 'any_user_id',
  parentId: 'any_parent_id',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('Create Task Use Case', () => {
  const taskRepositoryMock: ITaskRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  };

  it('Should be able to create a task', async () => {
    const { sut } = makeSut();

    jest.spyOn(taskRepositoryMock, 'findById').mockResolvedValue(taskMock);
    jest.spyOn(taskRepositoryMock, 'create').mockResolvedValue(taskMock);
    const httpRequest = httpRequestMock();

    const response = await sut(taskRepositoryMock).execute({
      ...httpRequest,
      parentId: 'any_id',
    });

    expect(response).toEqual(taskMock);
  });

  it('Should be able to return error parent task not found', async () => {
    const { sut } = makeSut();

    jest.spyOn(taskRepositoryMock, 'findById').mockRejectedValueOnce(null);
    jest.spyOn(taskRepositoryMock, 'create').mockResolvedValue(taskMock);
    const httpRequest = httpRequestMock();

    await expect(sut(taskRepositoryMock).execute(httpRequest)).rejects.toEqual({
      message: 'PARENT_TASK_ALREADY_EXISTS',
      statusCode: 400,
    });
  });
});
