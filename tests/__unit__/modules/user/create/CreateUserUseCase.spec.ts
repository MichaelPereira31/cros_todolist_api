import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { CreateUserUseCase } from '@modules/user/useCases/create/CreateUserUseCase';

jest.mock('@shared/util/encrypt', () => {
  return {
    encrypt: jest.fn(() => {
      return 'any_iv-any_encrypt_token';
    }),
  };
});

interface ISutTypes {
  sut: (userRepository: IUserRepository) => CreateUserUseCase;
}

const makeSut = (): ISutTypes => {
  const sut = (userRepository: IUserRepository) =>
    new CreateUserUseCase(userRepository);

  return { sut };
};

const httpRequestMock = () => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
});

const userMock = {
  id: 'any_id',
  email: 'any@emial.com',
  password: 'any_password',
  name: 'any_name',
  createdAt: new Date(),
  updatedAt: new Date(),
};
describe('Create User Use Case', () => {
  const userRepositoryMock: IUserRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  };

  it('Should be able to create a user', async () => {
    const { sut } = makeSut();

    jest.spyOn(userRepositoryMock, 'findByEmail').mockResolvedValue(null);
    jest.spyOn(userRepositoryMock, 'create').mockResolvedValue(userMock);
    const httpRequest = httpRequestMock();

    const response = await sut(userRepositoryMock).execute(httpRequest);

    expect(response).toEqual(userMock);
  });

  it('Should be able to return already existing user error', async () => {
    const { sut } = makeSut();

    jest.spyOn(userRepositoryMock, 'findByEmail').mockResolvedValue(userMock);
    const httpRequest = httpRequestMock();

    await expect(sut(userRepositoryMock).execute(httpRequest)).rejects.toEqual({
      message: 'USER_ALREADY_EXISTS',
      statusCode: 400,
    });
  });
});
