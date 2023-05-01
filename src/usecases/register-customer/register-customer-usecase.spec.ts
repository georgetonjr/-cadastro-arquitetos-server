import { mock, mockReset } from 'jest-mock-extended';
import { Validator } from '../../shared/interface/validator';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { InvalidDataError } from '../../shared/errors/invalid-data-error';
import { RegisterCustomer } from './register-customer-usecase';
import { CustomerRepository } from '../port/repositories/customer-repository';
import { EncryptComposition } from './domain/encrypt-composition';
import { RegisterCustomerRequest } from './domain/register-customer-request';
import { Customer } from '../../entities/customer';

const repository = mock<CustomerRepository>();
const validator = mock<Validator<any>>();
const encrypt = mock<EncryptComposition>();

const makeSUT = () => new RegisterCustomer(
  repository,
  validator,
  encrypt,
);

const mockPayload = {
  name: faker.datatype.string(),
  email: faker.datatype.string(),
  phone: faker.datatype.string(),
  gender: faker.datatype.string(),
  age: faker.datatype.number(),
  password: 'senha-criptografada',
} as RegisterCustomerRequest;

const mockCustomer = new Customer(mockPayload);
describe('RegisterCustomer', () => {
  let sut: RegisterCustomer;
  beforeEach(() => {
    sut = makeSUT();
    mockReset(repository);  
    mockReset(validator);
  });

  test('Should call execute with success', async () => {
    validator.validate.mockReturnValue({ isValid: true });
    encrypt.encryptEncode.mockReturnValue('senha-criptografada');
    const result = await sut.execute(mockPayload);
    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(mockCustomer);
    expect(encrypt.jwtSign).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('token');
    expect(result).toBe('token');
  });

  test('Should call execute with InvalidDataError', async () => {
    try {
      validator.validate.mockReturnValue({ isValid: false });
      await sut.execute(mockPayload);

    } catch (error) {
      expect(error).toBeInstanceOf(InvalidDataError);
    }
  });
});
