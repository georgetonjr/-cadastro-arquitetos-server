import { Customer } from '../../../entities/customer';

export interface CustomerRepository {
  save(data: Customer): Promise<void>;
}
