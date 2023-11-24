import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { UpdateUserUseCase } from '@modules/user/useCases/update/UpdateUserUseCase';

jest.mock('@shared/util/encrypt', () => {
  return {
    encrypt: jest.fn(() => {
      return 'any_iv-any_encrypt_token';
    }),
  };
});

interface ISutTypes {
  sut: (userRepository: IUserRepository) => UpdateUserUseCase;
}

const makeSut = (): ISutTypes => {
  const sut = (userRepository: IUserRepository) =>
    new UpdateUserUseCase(userRepository);

  return { sut };
};

const httpRequestMock = () => ({
  id: 'any_id',
  name: 'any_name',
});

const userMock = {
  id: 'any_id',
  email: 'any@emial.com',
  password: 'any_password',
  name: 'any_name',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('Update User Use Case', () => {
  const userRepositoryMock: IUserRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  };

  it('Should be able to update a user', async () => {
    const { sut } = makeSut();

    jest.spyOn(userRepositoryMock, 'findById').mockResolvedValue(userMock);
    jest.spyOn(userRepositoryMock, 'update').mockResolvedValue(userMock);
    const httpRequest = httpRequestMock();

    const response = await sut(userRepositoryMock).execute(httpRequest);

    expect(response).toEqual(userMock);
  });

  it('Should be able to update a user and password', async () => {
    const { sut } = makeSut();

    jest.spyOn(userRepositoryMock, 'findById').mockResolvedValue(userMock);
    jest.spyOn(userRepositoryMock, 'update').mockResolvedValue(userMock);
    const httpRequest = httpRequestMock();

    const response = await sut(userRepositoryMock).execute({
      ...httpRequest,
      password: 'any_password',
    });

    expect(response).toEqual(userMock);
  });

  it('Should be able to return already existing user error', async () => {
    const { sut } = makeSut();

    jest.spyOn(userRepositoryMock, 'findById').mockResolvedValue(null);
    const httpRequest = httpRequestMock();

    await expect(sut(userRepositoryMock).execute(httpRequest)).rejects.toEqual({
      message: 'USER_NOT_FOUND',
      statusCode: 400,
    });
  });
});
