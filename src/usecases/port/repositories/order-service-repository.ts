import { OrderService } from '../../../entities/order-service';

export interface OrderServiceRepository {
  save(data: OrderService): Promise<void>;
}
