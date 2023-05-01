import { inject, injectable } from 'tsyringe';
import { HttpResponse } from '../../../shared/interface/ http-response';
import { Controller } from '../../../shared/interface/controller';
import { HttpRequest } from '../../../shared/interface/http-request';
import { RegisterCustomerRequest } from '../../../usecases/register-customer/domain/register-customer-request';
import { InvalidDataError } from '../../../shared/errors/invalid-data-error';
import { AuthCustomerUsecase } from '../../../usecases/auth-customer/auth-customer-usecase';
import { CustomerNotFoundError } from '../../../shared/errors/customer-not-found-error';
import { AuthError } from '../../../shared/errors/auth-error';

@injectable()
export class AuthCustomerController implements Controller {
  constructor(
    @inject('AuthCustomerUsecase')
    private readonly usecase: AuthCustomerUsecase,
  ) {}

  private mapError(error: Error, response: HttpResponse) {
    switch (error.constructor) {
      case InvalidDataError:
        response.status(422).json({ message: error?.message });
        break;
      case CustomerNotFoundError:
        response.status(404).json({ message: error?.message });
        break;
      case AuthError:
        response.status(400).json({ message: error?.message });
        break;
    
      default:
        response.status(500).json({ message: error?.message || 'InternalServerError' });
        break;
    }
  }

  async handle(request: HttpRequest, response: HttpResponse): Promise<void> {
    try {
      const result = await this.usecase.execute(request.body as RegisterCustomerRequest);
      response.status(200).json(result);
    } catch (error) {
      this.mapError(error, response);
    }
  }
}
