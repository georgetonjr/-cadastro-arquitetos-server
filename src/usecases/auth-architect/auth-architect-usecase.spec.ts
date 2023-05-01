import { Validator } from '../../shared/interface/validator';
import { ArchitectRepository } from '../port/repositories/architect-repository';
import { AuthArchitect, EncryptVerifyAndSign } from './auth-architect-usecase';
import { mock, mockReset } from 'jest-mock-extended';
import { AuthArchitectRequest } from './domain/auth-architect-request';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { Architect } from 'src/entities/architect';
import { InvalidDataError } from '../../shared/errors/invalid-data-error';
import { ArchitectNotFoundError } from '../../shared/errors/architect-not-found-error';
import { AuthError } from '../../shared/errors/auth-error';

const repository = mock<ArchitectRepository>();
const encrypt = mock<EncryptVerifyAndSign>();
const validator = mock<Validator<any>>();

const makeSUT = () => new AuthArchitect(
  repository,
  encrypt,
  validator,
);

const mockPayload = {
  email: faker.datatype.string(),
  password: faker.datatype.string(),
} as AuthArchitectRequest;

const mockArchitect = {
  email: faker.datatype.string(),
  password: faker.datatype.string(),
  name: faker.datatype.string(),
  age: 18,
  id: faker.datatype.uuid(),
} as Architect;

describe('AuthArchitect', () => {
  let sut: AuthArchitect;
  beforeEach(() => {
    sut = makeSUT();
    mockReset(repository);
    mockReset(encrypt);
    mockReset(validator);
  });

  test('Should call execute with success', async () => {
    validator.validate.mockReturnValue({ isValid: true });
    repository.findOne.mockResolvedValue(mockArchitect);
    encrypt.encryptVerify.mockReturnValueOnce(true);
    const result = await sut.execute(mockPayload);
    expect(result).toHaveProperty('token');
    expect(validator.validate).toHaveBeenCalledTimes(1);
    expect(validator.validate).toHaveBeenCalledWith(mockPayload);
    expect(encrypt.encryptVerify).toHaveBeenCalledTimes(1);
    expect(encrypt.jwtSign).toHaveBeenCalledTimes(1);
  });

  test('Should call execute with InvalidDataError', async () => {
    try {
      validator.validate.mockReturnValue({ isValid: false });
      await sut.execute(mockPayload);
    } catch (err) {
      expect(validator.validate).toHaveBeenCalledTimes(1);
      expect(validator.validate).toHaveBeenCalledWith(mockPayload);
      expect(err).toBeInstanceOf(InvalidDataError);
    }
  });

  test('Should call execute with ArchitectNotFoundError', async () => {
    try {
      validator.validate.mockReturnValue({ isValid: true });
      repository.findOne.mockResolvedValue(undefined);
      await sut.execute(mockPayload);
      
    } catch (error) {
      expect(error).toBeInstanceOf(ArchitectNotFoundError);
      expect(validator.validate).toHaveBeenCalledTimes(1);
      expect(validator.validate).toHaveBeenCalledWith(mockPayload);
    }
  });

  test('Should call execute with AuthError', async () => {
    try {
      validator.validate.mockReturnValue({ isValid: true });
      repository.findOne.mockResolvedValue(mockArchitect);
      encrypt.encryptVerify.mockReturnValueOnce(false);
      await sut.execute(mockPayload);
      
    } catch (error) {
      expect(validator.validate).toHaveBeenCalledTimes(1);
      expect(validator.validate).toHaveBeenCalledWith(mockPayload);
      expect(encrypt.encryptVerify).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AuthError);
    }
  });
});
