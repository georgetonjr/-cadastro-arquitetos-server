import { Customer } from '../../../entities/customer';

export interface FindOptions {
  id: string;
  email: string;
}

export interface CustomerRepository {
  save(data: Customer): Promise<void>;
  findOne(findOptions: Partial<FindOptions>): Promise<Customer>;
}
