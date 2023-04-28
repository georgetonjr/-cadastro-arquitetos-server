import { Architect } from './architect';
import { Customer } from './customer';
import { OrderServiceStatusEnum } from './enum/order-service-status-enum';

export class OrderService {
  id?: string;

  title: string;

  description: string;

  price: number;

  status: OrderServiceStatusEnum;

  architect?: Architect;

  customer: Customer;

  createdAt?: Date;

  updatedAt?: Date;
}
