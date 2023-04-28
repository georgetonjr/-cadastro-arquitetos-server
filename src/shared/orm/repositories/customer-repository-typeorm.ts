import { Repository } from 'typeorm';
import { CustomerRepository } from '../../../usecases/port/repositories/customer-repository';
import { CustomerEntity } from '../entities/customer.entity';
import { dataSource } from '../../../infra/providers/database';
import { Customer } from '../../../entities/customer';
import { injectable } from 'tsyringe';

@injectable()
export class CustomerRepositoryTypeorm implements CustomerRepository {
  private repository: Repository<Customer>;

  constructor() {
    this.repository = dataSource.getRepository<Customer>(CustomerEntity);
  }

  async save(data: Customer): Promise<void> {
    await this.repository.save(data);
  }
}
