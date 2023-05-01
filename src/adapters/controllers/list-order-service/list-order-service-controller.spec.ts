import { mock, mockReset } from 'jest-mock-extended';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { ListOrderServiceUsecase } from 'src/usecases/list-order-service/list-order-service-usecase';
import { ListOrderServiceController } from './list-order-service-controller';
import { OrderService } from '../../../entities/order-service';
import { OrderServiceNotFoundError } from '../../../shared/errors/order-service-not-found';

const mockUsecase = mock<ListOrderServiceUsecase>();
const makeSUT = () => new ListOrderServiceController(mockUsecase);

const request = getMockReq();
const { res: response } = getMockRes();

describe('ListOrderServiceController', () => {
  let sut: ListOrderServiceController;
  beforeEach(() => {
    sut = makeSUT();
    mockReset(mockUsecase);
  });

  test('Shoud call handle with status 200', async () => {
    mockUsecase.execute.mockResolvedValue({ orderService: [] as OrderService[] });
    await sut.handle(request, response);
    expect(mockUsecase.execute).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({ orderService: [] as OrderService[] });
  });

  test('Shoud call handle with OrderServiceNotFoundError', async () => {
    mockUsecase.execute.mockRejectedValue(new OrderServiceNotFoundError());
    await sut.handle(request, response);
    expect(mockUsecase.execute).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledTimes(1);
  });

  test('Shoud call handle and receive any_error', async () => {
    mockUsecase.execute.mockRejectedValue(new Error());
    await sut.handle(request, response);
    expect(mockUsecase.execute).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledTimes(1);
  });
});
