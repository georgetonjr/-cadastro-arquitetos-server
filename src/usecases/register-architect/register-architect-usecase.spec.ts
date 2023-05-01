import { mock } from 'jest-mock-extended';
import { RegisterArchitect } from './register-architect-usecase';
import { ArchitectRepository } from '../port/repositories/architect-repository';
import { Validator } from '../../shared/interface/validator';
import { EncryptComposition } from './domain/encrypt-composition';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { RegisterArchitectRequest } from './domain/register-architect-request';
import { InvalidDataError } from '../../shared/errors/invalid-data-error';


const repository = mock<ArchitectRepository>();
const validator = mock<Validator<any>>();
const encrypt = mock<EncryptComposition>();

const makeSUT = () => new RegisterArchitect(
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
} as RegisterArchitectRequest;

describe('RegisterArchitect', () => {
  let sut: RegisterArchitect;
  beforeEach(()=>{
    sut = makeSUT();
  });
  test('Should call execute with success', async () => {
    validator.validate.mockReturnValue({ isValid: true });
    encrypt.encryptEncode.mockReturnValue('senha-criptografada');
    const result = await sut.execute(mockPayload);
    expect(repository.save).toHaveBeenCalledTimes(1);
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
