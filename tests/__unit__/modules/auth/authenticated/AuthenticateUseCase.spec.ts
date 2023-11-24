import { AuthenticateUseCase } from '@modules/auth/useCases/authenticated/AuthenticateUseCase';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';

jest.mock('@shared/util/encrypt', () => {
  return {
    encrypt: jest.fn(() => {
      return 'any-password';
    }),
  };
});

interface ISutTypes {
  sut: (userRepository: IUserRepository) => AuthenticateUseCase;
}

const makeSut = (): ISutTypes => {
  const sut = (userRepository: IUserRepository) =>
    new AuthenticateUseCase(userRepository);

  return { sut };
};

const httpRequestMock = () => ({
  email: 'any_email',
  password: 'password',
});

const userMock = {
  id: 'any_id',
  email: 'any@emial.com',
  password: 'any-password',
  name: 'any_name',
  createdAt: new Date(),
  updatedAt: new Date(),
};
describe('Authenticate User Use Case', () => {
  const userRepositoryMock: IUserRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  };

  it('Should be able to authenticate user', async () => {
    const { sut } = makeSut();

    jest.spyOn(userRepositoryMock, 'findByEmail').mockResolvedValue(userMock);

    const httpRequest = httpRequestMock();

    const response = await sut(userRepositoryMock).execute(httpRequest);

    expect(userRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
    expect(response.userId).toEqual(userMock.id);
  });

  it('Should be able to return error user not found', async () => {
    const { sut } = makeSut();

    jest.spyOn(userRepositoryMock, 'findByEmail').mockResolvedValue(null);
    const httpRequest = httpRequestMock();

    await expect(sut(userRepositoryMock).execute(httpRequest)).rejects.toEqual({
      message: 'USER_NOT_FOUND',
      statusCode: 404,
    });
  });

  it('Should be able to return error user not found', async () => {
    const { sut } = makeSut();
    jest.mock('@shared/util/encrypt', () => {
      return {
        encrypt: jest.fn(() => {
          return 'password';
        }),
      };
    });
    jest
      .spyOn(userRepositoryMock, 'findByEmail')
      .mockResolvedValue({ ...userMock, password: 'any' });
    const httpRequest = httpRequestMock();

    await expect(sut(userRepositoryMock).execute(httpRequest)).rejects.toEqual({
      message: 'ERROR_AUTHENTICATING',
      statusCode: 401,
    });
  });
});
