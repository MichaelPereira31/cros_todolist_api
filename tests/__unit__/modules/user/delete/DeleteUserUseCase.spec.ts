import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { DeleteByIdUserUseCase } from '@modules/user/useCases/delete/DeleteByIdUserUseCase';

interface ISutTypes {
  sut: (userRepository: IUserRepository) => DeleteByIdUserUseCase;
}

const makeSut = (): ISutTypes => {
  const sut = (userRepository: IUserRepository) =>
    new DeleteByIdUserUseCase(userRepository);

  return { sut };
};

const httpRequestMock = () => ({
  id: 'any_id',
});

const userMock = {
  id: 'any_id',
  email: 'any@emial.com',
  password: 'any_password',
  name: 'any_name',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('Delete User Use Case', () => {
  const userRepositoryMock: IUserRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  };

  it('Should be able to delete a user', async () => {
    const { sut } = makeSut();

    jest.spyOn(userRepositoryMock, 'findById').mockResolvedValue(userMock);
    const httpRequest = httpRequestMock().id;

    await sut(userRepositoryMock).execute(httpRequest);

    expect(userRepositoryMock.delete).toHaveBeenCalledWith(httpRequest);
  });

  it('Should be able to error user not found', async () => {
    const { sut } = makeSut();

    jest.spyOn(userRepositoryMock, 'findById').mockResolvedValue(null);
    const httpRequest = httpRequestMock().id;

    await expect(sut(userRepositoryMock).execute(httpRequest)).rejects.toEqual({
      message: 'USER_NOT_FOUND',
      statusCode: 400,
    });
  });
});
