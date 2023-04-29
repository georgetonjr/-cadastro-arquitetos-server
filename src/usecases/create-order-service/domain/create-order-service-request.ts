import { Customer } from '../../../entities/customer';

export interface CreateOrderServiceRequest {
  user: Customer;
  title: string;
  description: string;
  price: number;
}
