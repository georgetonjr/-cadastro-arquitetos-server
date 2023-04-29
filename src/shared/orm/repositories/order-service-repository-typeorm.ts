import { Repository } from 'typeorm';
import { OrderService } from '../../../entities/order-service';
import { OrderServiceRepository } from '../../../usecases/port/repositories/order-service-repository';
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error';
import { OrderServiceEntity } from '../entities/order-service.entity';
import { dataSource } from '../../../infra/providers/database';
import { injectable } from 'tsyringe';

@injectable()
export class OrderServiceRepositoryTypeorm implements OrderServiceRepository {
  private repository: Repository<OrderService>;

  constructor() {
    this.repository = dataSource.getRepository<OrderService>(OrderServiceEntity);
  }

  async save(data: OrderService): Promise<void> {
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
