import { Validator } from '../../shared/interface/validator';
import { mock, mockReset } from 'jest-mock-extended';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { InvalidDataError } from '../../shared/errors/invalid-data-error';
import { AuthError } from '../../shared/errors/auth-error';
import { AuthCustomerRequest } from './domain/auth-customer-request';
import { AuthCustomer } from './auth-customer-usecase';
import { CustomerRepository } from '../port/repositories/customer-repository';
import { CustomerNotFoundError } from '../../shared/errors/customer-not-found-error';
import { Customer } from 'src/entities/customer';
import { EncryptVerifyAndSign } from '../auth-architect/auth-architect-usecase';

const repository = mock<CustomerRepository>();
const encrypt = mock<EncryptVerifyAndSign>();
const validator = mock<Validator<any>>();

const makeSUT = () => new AuthCustomer(
  repository,
  encrypt,
  validator,
);

const mockPayload = {
  email: faker.datatype.string(),
  password: faker.datatype.string(),
} as AuthCustomerRequest;

const mockArchitect = {
  email: faker.datatype.string(),
  password: faker.datatype.string(),
  name: faker.datatype.string(),
  age: 18,
  id: faker.datatype.uuid(),
} as Customer;

describe('AuthCustomer', () => {
  let sut: AuthCustomer;
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

  test('Should call execute with CustomerNotFoundError', async () => {
    try {
      validator.validate.mockReturnValue({ isValid: true });
      repository.findOne.mockResolvedValue(undefined);
      await sut.execute(mockPayload);
      
    } catch (error) {
      expect(error).toBeInstanceOf(CustomerNotFoundError);
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
