import { ITaskRepository } from '@modules/task/repositories/ITaskRepository';
import { DeleteByIdTaskUseCase } from '@modules/task/useCases/delete/DeleteByIdTaskUseCase';
import { StatusTask } from '@prisma/client';

interface ISutTypes {
  sut: (userRepository: ITaskRepository) => DeleteByIdTaskUseCase;
}

const makeSut = (): ISutTypes => {
  const sut = (taskRepository: ITaskRepository) =>
    new DeleteByIdTaskUseCase(taskRepository);

  return { sut };
};

const httpRequestMock = () => ({
  id: 'any_id',
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

describe('Delete Task Use Case', () => {
  const taskRepositoryMock: ITaskRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  };

  it('Should be able to delete a task', async () => {
    const { sut } = makeSut();

    jest.spyOn(taskRepositoryMock, 'findById').mockResolvedValue(taskMock);
    const httpRequest = httpRequestMock().id;

    await sut(taskRepositoryMock).execute(httpRequest);

    expect(taskRepositoryMock.delete).toHaveBeenCalledWith(httpRequest);
  });

  it('Should be able to return error task not found', async () => {
    const { sut } = makeSut();

    jest.spyOn(taskRepositoryMock, 'findById').mockResolvedValue(null);
    const httpRequest = httpRequestMock().id;

    await expect(sut(taskRepositoryMock).execute(httpRequest)).rejects.toEqual({
      message: 'TASK_NOT_FOUND',
      statusCode: 400,
    });
  });
});
