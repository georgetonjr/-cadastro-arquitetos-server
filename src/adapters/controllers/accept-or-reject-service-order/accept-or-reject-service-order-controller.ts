import { inject, injectable } from 'tsyringe';
import { HttpResponse } from '../../../shared/interface/ http-response';
import { Controller } from '../../../shared/interface/controller';
import { HttpRequest } from '../../../shared/interface/http-request';
import { InvalidDataError } from '../../../shared/errors/invalid-data-error';
import { 
  AcceptOrRejectOrderServiceUsecase, 
} from '../../../usecases/accept-or-reject-service-order/accept-or-reject-order-service-usecase';

@injectable()
export class AcceptOrRejectOrderServiceController implements Controller {
  constructor(
    @inject('AcceptOrRejectOrderServiceUsecase')
    private readonly usecase: AcceptOrRejectOrderServiceUsecase,
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
      const result = await this.usecase.execute({ 
        ...request.params, 
        user: request.body.user,
      });
      response.status(200).json(result);
    } catch (error) {
      this.mapError(error, response);
    }
  }
}
