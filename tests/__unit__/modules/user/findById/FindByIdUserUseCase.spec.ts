import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { FindByIdUserUseCase } from '@modules/user/useCases/findById/FindByIdUserUseCase';

interface ISutTypes {
  sut: (userRepository: IUserRepository) => FindByIdUserUseCase;
}

const makeSut = (): ISutTypes => {
  const sut = (userRepository: IUserRepository) =>
    new FindByIdUserUseCase(userRepository);

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

  it('Should be able to find by id user', async () => {
    const { sut } = makeSut();

    jest.spyOn(userRepositoryMock, 'findById').mockResolvedValue(userMock);
    const httpRequest = httpRequestMock().id;

    const response = await sut(userRepositoryMock).execute(httpRequest);

    expect(response).toEqual(userMock);
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
