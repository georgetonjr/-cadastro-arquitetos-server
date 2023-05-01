import { inject, injectable } from 'tsyringe';
import { HttpResponse } from '../../../shared/interface/ http-response';
import { Controller } from '../../../shared/interface/controller';
import { HttpRequest } from '../../../shared/interface/http-request';
import { InvalidDataError } from '../../../shared/errors/invalid-data-error';
import { FinishOrderServiceUsecase } from '../../../usecases/finish-order-service/finish-order-service-usecase';
import { FinishOrderServiceRequest } from 'src/usecases/finish-order-service/domain/finish-order-service-request';

@injectable()
export class FinishOrderServiceController implements Controller {
  constructor(
    @inject('FinishOrderService')
    private readonly usecase: FinishOrderServiceUsecase,
  ) {}

  private mapError(error: Error, response: HttpResponse) {
    switch (error.constructor) {
      case InvalidDataError:
        response.status(422).json({ message: error?.message });
        break;
      default:
        response.status(500).json({ message: error?.message || 'InternalServerError' });
        break;
    }
  }

  async handle(request: HttpRequest, response: HttpResponse): Promise<void> {
    try {
      const payload: FinishOrderServiceRequest = {
        orderServiceId: request?.params?.id,
      };

      await this.usecase.execute(payload);
      response.sendStatus(204);
    } catch (error) {
      this.mapError(error, response);
    }
  }
}
