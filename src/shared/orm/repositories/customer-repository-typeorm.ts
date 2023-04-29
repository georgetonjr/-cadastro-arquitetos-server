import { Repository } from 'typeorm';
import { CustomerRepository } from '../../../usecases/port/repositories/customer-repository';
import { CustomerEntity } from '../entities/customer.entity';
import { dataSource } from '../../../infra/providers/database';
import { Customer } from '../../../entities/customer';
import { injectable } from 'tsyringe';
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error';

@injectable()
export class CustomerRepositoryTypeorm implements CustomerRepository {
  private repository: Repository<Customer>;

  constructor() {
    this.repository = dataSource.getRepository<Customer>(CustomerEntity);
  }

  async save(data: Customer): Promise<void> {
    try {
      await this.repository.save(data);
    } catch (error) {
      if (error.message?.includes('duplicate key value violates')) {
        throw new UserAlreadyExistsError();
      }
      throw error;
    }
  }
}
