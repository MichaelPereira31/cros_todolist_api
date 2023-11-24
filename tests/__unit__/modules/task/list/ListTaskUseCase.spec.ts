import { ITaskRepository } from '@modules/task/repositories/ITaskRepository';
import { ListTaskUseCase } from '@modules/task/useCases/ListStatus/ListTaskUseCase';
import { StatusTask } from '@prisma/client';

interface ISutTypes {
  sut: (taskRepository: ITaskRepository) => ListTaskUseCase;
}

const makeSut = (): ISutTypes => {
  const sut = (taskRepository: ITaskRepository) =>
    new ListTaskUseCase(taskRepository);

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
    list: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  };

  it('Should be able to return tasks', async () => {
    const { sut } = makeSut();

    jest.spyOn(taskRepositoryMock, 'list').mockResolvedValue(taskMock);
    const httpRequest = httpRequestMock();

    const response = await sut(taskRepositoryMock).execute(httpRequest);

    expect(response).toEqual(taskMock);
  });
});
