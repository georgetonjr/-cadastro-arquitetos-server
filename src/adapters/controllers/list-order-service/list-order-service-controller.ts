import { inject, injectable } from 'tsyringe';
import { HttpResponse } from '../../../shared/interface/ http-response';
import { Controller } from '../../../shared/interface/controller';
import { OrderServiceNotFoundError } from '../../../shared/errors/order-service-not-found';
import { ListOrderServiceUsecase } from '../../../usecases/list-order-service/list-order-service-usecase';

@injectable()
export class ListOrderServiceController implements Controller {
  constructor(
    @inject('ListOrderServiceUsecase')
    private readonly usecase: ListOrderServiceUsecase,
  ) {}

  private mapError(error: Error, response: HttpResponse) {
    switch (error.constructor) {
      case OrderServiceNotFoundError:
        response.status(404).json({ message: error?.message });
        break;
      default:
        response.status(500).json({ message: error?.message || 'InternalServerError' });
        break;
    }
  }

  async handle(_, response: HttpResponse): Promise<void> {
    try {
      const result = await this.usecase.execute();
      response.status(200).json(result);
    } catch (error) {
      this.mapError(error, response);
    }
  }
}
