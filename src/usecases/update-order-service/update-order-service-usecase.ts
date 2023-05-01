import { inject, injectable } from 'tsyringe';
import { Usecase } from '../../shared/interface/usecase';
import { UpdateOrderServiceRequest } from './domain/update-order-service-request';
import { OrderServiceRepository } from '../port/repositories/order-service-repository';
import { Validator } from '../../shared/interface/validator';
import { InvalidDataError } from '../../shared/errors/invalid-data-error';

export interface UpdateOrderServiceUsecase extends Usecase<UpdateOrderServiceRequest, void> {}

@injectable()
export class UpdateOrderService implements UpdateOrderServiceUsecase {
  constructor(
    @inject('OrderServiceRepository')
    private readonly repository: OrderServiceRepository,
    @inject('UpdateOrderServiceValidator')
    private readonly validator: Validator<UpdateOrderServiceRequest>,
  ) {}

  async execute(payload: UpdateOrderServiceRequest): Promise<void> {
    try {
      const { errorFields, isValid } = this.validator.validate(payload);
      if (!isValid) {
        throw new InvalidDataError(errorFields);
      }

      await this.repository.update(payload.id, payload.updateOptions);

    } catch (err) {
      throw err;
    }
  }
  
}
