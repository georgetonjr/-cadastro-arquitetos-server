import { inject, injectable } from 'tsyringe';
import { Usecase } from '../../shared/interface/usecase';
import { AcceptOrRejectOrderServiceRequest } from './domain/accept-or-reject-order-service-request';
import { OrderServiceRepository } from '../port/repositories/order-service-repository';
import { Architect } from '../../entities/architect';
import { OrderServiceStatusEnum } from '../../entities/enum/order-service-status-enum';
import { Validator } from '../../shared/interface/validator';
import { InvalidDataError } from '../../shared/errors/invalid-data-error';

export interface AcceptOrRejectOrderServiceUsecase extends Usecase<AcceptOrRejectOrderServiceRequest, any> { }


@injectable()
export class AcceptOrRejectOrderService implements AcceptOrRejectOrderServiceUsecase {
  constructor(
    @inject('OrderServiceRepository')
    private readonly repository: OrderServiceRepository,
    @inject('AcceptOrRejectOrderServiceValidator')
    private readonly validator: Validator<AcceptOrRejectOrderServiceRequest>,
  ) {}

  async execute(payload: AcceptOrRejectOrderServiceRequest): Promise<void> {
    try {

      const { errorFields, isValid } = this.validator.validate(payload);
      if (!isValid) {
        throw new InvalidDataError(errorFields);
      }
      
      const architect = new Architect(payload.user);
      await this.dispatch(payload.action, payload.orderServiceId, architect);
    } catch (error) {
      throw error;
    }

  }

  private async dispatch(action: string, orderServiceid: string, architect: Architect) {
    const actionDispatcher = {
      ['accept']: async () => this.acceptedAction(orderServiceid, architect),
      ['reject']: async () => this.rejectedAction(orderServiceid, architect),
    };

    return actionDispatcher[action]();
  }


  private async acceptedAction(id: string, architect: Architect) { 
    await this.repository.update(id, {
      status: OrderServiceStatusEnum.ACCEPTED,
      architect,
    });
  }
  
  private async rejectedAction(id: string, architect: Architect) { 
    await this.repository.update(id, {
      rejectedBy: [ architect.id ],
    });
  }
}
