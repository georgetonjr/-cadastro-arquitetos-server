import { mock, mockReset } from 'jest-mock-extended';
import { UpdateOrderService } from './update-order-service-usecase';
import { OrderServiceRepository } from '../port/repositories/order-service-repository';
import { Validator } from '../../shared/interface/validator';
import { UpdateOrderServiceRequest } from './domain/update-order-service-request';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { InvalidDataError } from '../../shared/errors/invalid-data-error';

const repository = mock<OrderServiceRepository>();
const validator = mock<Validator<any>>();

const makeSUT = () => new UpdateOrderService(
  repository,
  validator,
);

const mockPayload = {
  id: faker.datatype.uuid(),
  updateOptions: {
    isActive: faker.datatype.boolean(),
    show: faker.datatype.boolean(),
    title: faker.datatype.string(),
    description: faker.datatype.string(),
    price: faker.datatype.number(),
  },
} as UpdateOrderServiceRequest;

describe('UpdateOrderService', () => {
  let sut: UpdateOrderService;
  beforeEach(() => {
    sut = makeSUT();
    mockReset(repository);  
    mockReset(validator);
  });

  test('Should call execute with success', async () => {
    validator.validate.mockReturnValue({ isValid: true });
    await sut.execute(mockPayload);
    expect(repository.update).toHaveBeenCalledTimes(1);
    expect(repository.update).toHaveBeenCalledWith(mockPayload.id, mockPayload.updateOptions);
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
