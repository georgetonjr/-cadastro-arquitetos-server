import { inject, injectable } from 'tsyringe';
import { HttpResponse } from '../../../shared/interface/ http-response';
import { Controller } from '../../../shared/interface/controller';
import { HttpRequest } from '../../../shared/interface/http-request';
import { InvalidDataError } from '../../../shared/errors/invalid-data-error';
import { CustomerNotFoundError } from '../../../shared/errors/customer-not-found-error';
import { UpdateOrderServiceUsecase } from '../../../usecases/update-order-service/update-order-service-usecase';
import { UpdateOrderServiceRequest } from '../../../usecases/update-order-service/domain/update-order-service-request';

@injectable()
export class UpdaterderServiceController implements Controller {
  constructor(
    @inject('UpdateOrderServiceUsecase')
    private readonly usecase: UpdateOrderServiceUsecase,
  ) {}

  private mapError(error: Error, response: HttpResponse) {
    switch (error.constructor) {
      case InvalidDataError:
        response.status(422).json({ message: error?.message });
        break;
      case CustomerNotFoundError:
        response.status(404).json({ message: error?.message });
        break;
      default:
        response.status(500).json({ message: error?.message || 'InternalServerError' });
        break;
    }
  }

  async handle(request: HttpRequest, response: HttpResponse): Promise<void> {
    try {
      delete request.body.user;
      const payload: UpdateOrderServiceRequest = {
        id: request?.params?.id,
        updateOptions: request.body.updateOptions,
      };

      await this.usecase.execute(payload);
      response.sendStatus(204);
    } catch (error) {
      this.mapError(error, response);
    }
  }
}
