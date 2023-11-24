import { ITaskRepository } from '@modules/task/repositories/ITaskRepository';
import { FindByStatusTaskUseCase } from '@modules/task/useCases/findByStatus/FindByStatusTaskUseCase';
import { StatusTask } from '@prisma/client';

interface ISutTypes {
  sut: (taskRepository: ITaskRepository) => FindByStatusTaskUseCase;
}

const makeSut = (): ISutTypes => {
  const sut = (taskRepository: ITaskRepository) =>
    new FindByStatusTaskUseCase(taskRepository);

  return { sut };
};

const httpRequestMock = () => ({
  status: 'cancelada',
  userId: 'user_id',
});

const taskMock = [
  {
    id: 'any_id',
    description: 'any_description',
    title: 'any_title',
    status: StatusTask.cancelada,
    userId: 'any_user_id',
    parentId: 'any_parent_id',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('Find By Status Task Use Case', () => {
  const taskRepositoryMock: ITaskRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    find: jest.fn(),
    findByStatus: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  };

  it('Should be able to return tasks', async () => {
    const { sut } = makeSut();

    jest.spyOn(taskRepositoryMock, 'findByStatus').mockResolvedValue(taskMock);
    const httpRequest = httpRequestMock();

    const response = await sut(taskRepositoryMock).execute(httpRequest);

    expect(response).toEqual(taskMock);
  });

  it('Should be able to return error task not found', async () => {
    const { sut } = makeSut();

    jest.spyOn(taskRepositoryMock, 'findByStatus').mockResolvedValue([]);
    const httpRequest = httpRequestMock();

    await expect(sut(taskRepositoryMock).execute(httpRequest)).rejects.toEqual({
      message: 'TASKS_NOT_FOUND',
      statusCode: 400,
    });
  });
});
