import { inject, injectable } from 'tsyringe';
import { Usecase } from '../../shared/interface/usecase';
import { OrderServiceRepository } from '../port/repositories/order-service-repository';
import { Validator } from '../../shared/interface/validator';
import { InvalidDataError } from '../../shared/errors/invalid-data-error';
import { FinishOrderServiceRequest } from './domain/finish-order-service-request';
import { OrderServiceStatusEnum } from 'src/entities/enum/order-service-status-enum';

export interface FinishOrderServiceUsecase extends Usecase<FinishOrderServiceRequest, void> {}

@injectable()
export class FinishOrderService implements FinishOrderServiceUsecase {
  constructor(
    @inject('OrderServiceRepository')
    private readonly repository: OrderServiceRepository,
    @inject('FinishOrderServiceValidator')
    private readonly validator: Validator<FinishOrderServiceRequest>,
  ) {}

  async execute(payload: FinishOrderServiceRequest): Promise<void> {
    try {
      const { errorFields, isValid } = this.validator.validate(payload);
      if (!isValid) {
        throw new InvalidDataError(errorFields);
      }

      await this.repository.update(payload.orderServiceId, { status: OrderServiceStatusEnum.COMPLETED });

    } catch (err) {
      throw err;
    }
  }
  
}
