import { factory } from '../infra/dependency-injection/service-factory';
import { IdentifierGenerator } from '../shared/interface/identifier-generator';

export class Architect {
  constructor(data: Partial<Architect>) {
    if (!data.id) {
      const idGenerator = factory<IdentifierGenerator>('IdentifierGenerator');
      this.id = idGenerator.generateId();
    } else {
      this.id = data.id;
    }
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.gender = data.gender;
    this.age = data.age;
    this.password = data.password;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  id: string;

  name: string;

  email: string;

  phone: string;

  gender: string;

  age: number;

  password: string;

  createdAt?: Date;

  updatedAt?: Date;
}
