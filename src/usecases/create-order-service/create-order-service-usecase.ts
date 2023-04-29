import { inject, injectable } from 'tsyringe';
import { Usecase } from '../../shared/interface/usecase';
import { Validator } from '../../shared/interface/validator';
import { InvalidDataError } from '../../shared/errors/invalid-data-error';
import { CreateOrderServiceRequest } from './domain/create-order-service-request';
import { OrderServiceRepository } from '../port/repositories/order-service-repository';
import { OrderService } from '../../entities/order-service';
import { Customer } from '../../entities/customer';
import { OrderServiceStatusEnum } from '../../entities/enum/order-service-status-enum';
import { CreateOrderServiceResponse } from './domain/create-order-service-response';
import { CustomerRepository } from '../port/repositories/customer-repository';
import { CustomerNotFoundError } from '../../shared/errors/customer-not-found-error';

export interface CreateOrderServiceUsecase extends Usecase<
CreateOrderServiceRequest, 
CreateOrderServiceResponse | Error
> {}

@injectable()
export class CreateOrderService implements CreateOrderServiceUsecase {
  constructor(
    @inject('OrderServiceRepository')
    private readonly repository: OrderServiceRepository,
    @inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
    @inject('CreateOrderServiceValidator')
    private readonly validator: Validator<CreateOrderServiceRequest>,
  ) {}
  
  async execute(payload: CreateOrderServiceRequest): Promise<CreateOrderServiceResponse | Error> {
    try {
      const { errorFields, isValid } = this.validator.validate(payload);
      if (!isValid) {
        throw new InvalidDataError(errorFields);
      }
      const customer = await this.customerRepository.findOne({ id: payload.user.id });
      if (!customer) {
        throw new CustomerNotFoundError();
      }

      await this.buildOrderService(payload);

      return { 
        success: true,
        message: 'Order service created successfully',
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private async buildOrderService(data: CreateOrderServiceRequest): Promise<OrderService> {
    const customer = new Customer(data.user);
    delete data.user;

    const orderService = new OrderService({
      customer,
      title: data.title,
      description: data.description,
      status: OrderServiceStatusEnum.REQUESTED,
      price: data.price,
    });

    await this.repository.save(orderService);
    return orderService;
  }
}
