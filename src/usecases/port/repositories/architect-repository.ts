import { Architect } from '../../../entities/architect';

export interface FindOptions {
  id: string;
  email: string;
}

export interface ArchitectRepository {
  save(data: Architect): Promise<void>;
  findOne(findOptions: Partial<FindOptions>): Promise<Architect>;
}
