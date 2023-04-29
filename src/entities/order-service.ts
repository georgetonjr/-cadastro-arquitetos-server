import { factory } from '../infra/dependency-injection/service-factory';
import { IdentifierGenerator } from '../shared/interface/identifier-generator';
import { Architect } from './architect';
import { Customer } from './customer';
import { OrderServiceStatusEnum } from './enum/order-service-status-enum';

export class OrderService {
  constructor(data: OrderService) {
    if (!data.id) {
      const idGenerator = factory<IdentifierGenerator>('IdentifierGenerator');
      this.id = idGenerator.generateId();
    } else {
      this.id = data.id;
    }
    this.title = data.title;
    this.description = data.description;
    this.status = data.status;
    this.customer = data.customer;
    this.price = data.price;
    this.architect = data.architect;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.isActive = data.isActive;
    this.rejectedBy = data.rejectedBy;
    this.show = data.show;
  }

  id?: string;

  isActive?: boolean;

  title: string;

  description: string;

  price: number;

  status: OrderServiceStatusEnum;

  architect?: Architect;

  customer: Customer;

  show?: boolean;

  rejectedBy?: string[];

  createdAt?: Date;

  updatedAt?: Date;
}
