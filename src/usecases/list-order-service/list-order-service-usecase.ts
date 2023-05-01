import { inject, injectable } from 'tsyringe';
import { Usecase } from '../../shared/interface/usecase';
import { ListOrderServiceResponse } from './domain/list-order-service-response';
import { OrderServiceRepository } from '../port/repositories/order-service-repository';
import { OrderServiceNotFoundError } from '../../shared/errors/order-service-not-found';

export interface ListOrderServiceUsecase extends Usecase<
void, 
ListOrderServiceResponse | Error
> {}

@injectable()
export class ListOrderService implements ListOrderServiceUsecase {
  constructor(
    @inject('OrderServiceRepository')
    private readonly repository: OrderServiceRepository,
  ) {}
  
  async execute(): Promise<ListOrderServiceResponse | Error> {
    try {
      const orderServices = await this.repository.list();

      if (!orderServices) {
        throw new OrderServiceNotFoundError();
      }

      return { orderService: orderServices };
    } catch (error) {
      throw error;
    }
  }
}
