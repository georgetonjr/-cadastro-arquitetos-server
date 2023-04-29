import { Architect } from '../../../entities/architect';

export interface ArchitectRepository {
  save(data: Architect): Promise<void>;
}
