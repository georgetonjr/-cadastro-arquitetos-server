import { Repository } from 'typeorm';
import { Architect } from '../../../entities/architect';
import { ArchitectRepository } from '../../../usecases/port/repositories/architect-repository';
import { ArchitectEntity } from '../entities/architect-entity';
import { dataSource } from '../../../infra/providers/database';
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error';
import { injectable } from 'tsyringe';

@injectable()
export class ArchitectRepositoryTypeorm implements ArchitectRepository {
  private repository: Repository<Architect>;

  constructor() {
    this.repository = dataSource.getRepository<Architect>(ArchitectEntity);
  }

  async save(data: Architect): Promise<void> {
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
