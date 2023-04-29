import { inject, injectable } from 'tsyringe';
import { HttpResponse } from '../../../shared/interface/ http-response';
import { Controller } from '../../../shared/interface/controller';
import { HttpRequest } from '../../../shared/interface/http-request';
import { InvalidDataError } from '../../../shared/errors/invalid-data-error';
import { CreateOrderServiceUsecase } from '../../../usecases/create-order-service/create-order-service-usecase';
import { CreateOrderServiceRequest } from '../../../usecases/create-order-service/domain/create-order-service-request';
import { CustomerNotFoundError } from '../../../shared/errors/customer-not-found-error';

@injectable()
export class CreateOrderServiceController implements Controller {
  constructor(
    @inject('CreateOrderServiceUsecase')
    private readonly usecase: CreateOrderServiceUsecase,
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
      const result = await this.usecase.execute(request.body as CreateOrderServiceRequest);
      response.status(201).json(result);
    } catch (error) {
      this.mapError(error, response);
    }
  }
}
