import { mock, mockReset } from 'jest-mock-extended';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { ListOrderService } from './list-order-service-usecase';
import { OrderServiceRepository } from '../port/repositories/order-service-repository';
import { OrderService } from '../../entities/order-service';
import { Customer } from '../../entities/customer';
import { Architect } from '../../entities/architect';
import { OrderServiceStatusEnum } from '../../entities/enum/order-service-status-enum';
import { OrderServiceNotFoundError } from '../../shared/errors/order-service-not-found';

const repository = mock<OrderServiceRepository>();

const mockResponse = {
  id: faker.datatype.uuid(),
  isActive: faker.datatype.boolean(),
  title: faker.datatype.string(),
  description: faker.datatype.string(),
  price: faker.datatype.number(),
  status: OrderServiceStatusEnum.REQUESTED,
  architect: {} as Architect,
  customer: {} as Customer,
  show: faker.datatype.boolean(),
  rejectedBy: [],
} as OrderService;


const makeSUT = () => new ListOrderService(
  repository,
);

describe('RegisterCustomer', () => {
  let sut: ListOrderService;
  beforeEach(() => {
    sut = makeSUT();
    mockReset(repository);  
  });

  test('Should call execute with success', async () => {
    repository.list.mockResolvedValue([ mockResponse ]);
    const result = await sut.execute();
    expect(repository.list).toHaveBeenCalledTimes(1);
    expect(repository.list).toHaveBeenCalledWith();
    expect(result).toHaveProperty('orderService');
  });

  test('Should call execute with OrderServiceNotFoundError', async () => {
    repository.list.mockResolvedValue(undefined);
    try {
      await sut.execute();
    } catch (error) {
      expect(repository.list).toHaveBeenCalledTimes(1);
      expect(repository.list).toHaveBeenCalledWith();
      expect(error).toBeInstanceOf(OrderServiceNotFoundError);
    }
  });
});
