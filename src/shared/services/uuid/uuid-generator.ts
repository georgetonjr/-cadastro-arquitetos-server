import { injectable } from 'tsyringe';
import { IdentifierGenerator } from '../../interface/identifier-generator';
import { v4 as uuid } from 'uuid';

@injectable()
export class UuidGenerator implements IdentifierGenerator {
  generateId(): string {
    return uuid();
  }

}
