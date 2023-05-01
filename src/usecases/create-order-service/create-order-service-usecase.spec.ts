import { mock, mockReset } from 'jest-mock-extended';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { OrderServiceRepository } from '../port/repositories/order-service-repository';
import { Customer } from '../../entities/customer';
import { Validator } from '../../shared/interface/validator';
import { CustomerRepository } from '../port/repositories/customer-repository';
import { CreateOrderService } from './create-order-service-usecase';
import { CreateOrderServiceRequest } from './domain/create-order-service-request';
import { InvalidDataError } from '../../shared/errors/invalid-data-error';
import { CustomerNotFoundError } from 'src/shared/errors/customer-not-found-error';

const repository = mock<OrderServiceRepository>();
const customerRepository = mock<CustomerRepository>();
const validator = mock<Validator<any>>();

const mockPayload = {
  user: {
    id: faker.datatype.uuid(),
  } as Customer,
  title: faker.datatype.string(),
  description: faker.datatype.string(),
  price: faker.datatype.number(),
} as CreateOrderServiceRequest;


const makeSUT = () => new CreateOrderService(
  repository,
  customerRepository,
  validator,
);

describe('CreateOrderService', () => {
  let sut: CreateOrderService;
  beforeEach(() => {
    sut = makeSUT();
    mockReset(repository);  
  });

  test('Should call execute with success', async () => {
    customerRepository.findOne.mockResolvedValue(mockPayload.user);
    const result = await sut.execute(mockPayload);
    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(customerRepository.findOne).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('orderService');
  });

  test('Should call execute with InvalidDataError', async () => {
    try {
      validator.validate.mockReturnValue({ isValid: false });
      await sut.execute(mockPayload);

    } catch (error) {
      expect(error).toBeInstanceOf(InvalidDataError);
    }
  });

  test('Should call execute with CustomerNotFoundError', async () => {
    try {
      validator.validate.mockReturnValue({ isValid: true });
      customerRepository.findOne.mockResolvedValue(undefined);
      await sut.execute(mockPayload);

    } catch (error) {
      expect(error).toBeInstanceOf(CustomerNotFoundError);
    }
  });
});
