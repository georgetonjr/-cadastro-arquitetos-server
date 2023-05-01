import { OrderService } from '../../../entities/order-service';

export interface ListOptions {
  customerId: string;
  architectId: string;
}

export interface OrderServiceRepository {
  save(data: OrderService): Promise<void>;
  list(options?: ListOptions): Promise<OrderService[]>;
  update(criteria: string, options: Partial<OrderService>): Promise<void>;
}
