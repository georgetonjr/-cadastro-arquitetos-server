import { inject, injectable } from 'tsyringe';
import { HttpResponse } from '../../../shared/interface/ http-response';
import { Controller } from '../../../shared/interface/controller';
import { HttpRequest } from '../../../shared/interface/http-request';
import { RegisterCustomerRequest } from '../../../usecases/register-customer/domain/register-customer-request';
import { InvalidDataError } from '../../../shared/errors/invalid-data-error';
import { AuthArchitectUsecase } from '../../../usecases/auth-architect/auth-architect-usecase';
import { AuthError } from '../../../shared/errors/auth-error';
import { ArchitectNotFoundError } from '../../../shared/errors/architect-not-found-error';

@injectable()
export class AuthArchitectController implements Controller {
  constructor(
    @inject('AuthArchitectUsecase')
    private readonly usecase: AuthArchitectUsecase,
  ) {}

  private mapError(error: Error, response: HttpResponse) {
    switch (error.constructor) {
      case InvalidDataError:
        response.status(422).json({ message: error?.message });
        break;
      case ArchitectNotFoundError:
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
