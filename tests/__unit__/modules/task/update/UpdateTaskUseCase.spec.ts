import { ITaskRepository } from '@modules/task/repositories/ITaskRepository';
import { UpdateTaskUseCase } from '@modules/task/useCases/update/UpdateTaskUseCase';
import { StatusTask } from '@prisma/client';

interface ISutTypes {
  sut: (taskRepository: ITaskRepository) => UpdateTaskUseCase;
}

const makeSut = (): ISutTypes => {
  const sut = (taskRepository: ITaskRepository) =>
    new UpdateTaskUseCase(taskRepository);

  return { sut };
};

const httpRequestMock = () => ({
  id: 'any_id',
  description: 'any_description',
  title: 'any_title',
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

describe('Update Task Use Case', () => {
  const taskRepositoryMock: ITaskRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    find: jest.fn(),
    findByStatus: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  };

  it('Should be able to update a task', async () => {
    const { sut } = makeSut();

    jest.spyOn(taskRepositoryMock, 'findById').mockResolvedValue(taskMock);
    jest.spyOn(taskRepositoryMock, 'update').mockResolvedValue(taskMock);
    const httpRequest = httpRequestMock();

    const response = await sut(taskRepositoryMock).execute(httpRequest);

    expect(response).toEqual(taskMock);
  });

  it('Should be able to return already existing task error', async () => {
    const { sut } = makeSut();

    jest.spyOn(taskRepositoryMock, 'findById').mockResolvedValue(null);
    const httpRequest = httpRequestMock();

    await expect(sut(taskRepositoryMock).execute(httpRequest)).rejects.toEqual({
      message: 'TASK_NOT_FOUND',
      statusCode: 400,
    });
  });
});
