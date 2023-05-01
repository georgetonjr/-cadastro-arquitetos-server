import { Validator } from '../../shared/interface/validator';
import { mock, mockReset } from 'jest-mock-extended';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { Architect } from 'src/entities/architect';
import { InvalidDataError } from '../../shared/errors/invalid-data-error';
import { AcceptOrRejectOrderService } from './accept-or-reject-order-service-usecase';
import { OrderServiceRepository } from '../port/repositories/order-service-repository';
import { AcceptOrRejectOrderServiceRequest } from './domain/accept-or-reject-order-service-request';

const repository = mock<OrderServiceRepository>();
const validator = mock<Validator<any>>();

const makeSUT = () => new AcceptOrRejectOrderService(
  repository,
  validator,

);

const mockPayload = {
  action: 'accept',
  orderServiceId: faker.datatype.uuid(),
  user: {} as Architect,
} as AcceptOrRejectOrderServiceRequest;

describe('AcceptOrRejectOrderService', () => {
  let sut: AcceptOrRejectOrderService;
  beforeEach(() => {
    sut = makeSUT();
    mockReset(repository);
    mockReset(validator);
  });

  test('Should call execute with success', async () => {
    validator.validate.mockReturnValue({ isValid: true });
    await sut.execute(mockPayload);
    expect(repository.update).toHaveBeenCalledTimes(1);
    expect(validator.validate).toHaveBeenCalledTimes(1);
    expect(validator.validate).toHaveBeenCalledWith(mockPayload);
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
});
