import { inject, injectable } from 'tsyringe';
import { HttpResponse } from '../../../shared/interface/ http-response';
import { Controller } from '../../../shared/interface/controller';
import { HttpRequest } from '../../../shared/interface/http-request';
import { RegisterCustomeUsecase } from '../../../usecases/register-customer/register-customer-usecase';
import { RegisterCustomerRequest } from '../../../usecases/register-customer/domain/register-customer-request';
import { InvalidDataError } from '../../../shared/errors/invalid-data-error';
import { UserAlreadyExistsError } from '../../../shared/errors/user-already-exists-error';

@injectable()
export class RegisterCustomerController implements Controller {
  constructor(
    @inject('RegisterCustomerUsecase')
    private readonly usecase: RegisterCustomeUsecase,
  ) {}

  private mapError(error: Error, response: HttpResponse) {
    switch (error.constructor) {
      case InvalidDataError:
        response.status(422).json({ message: error?.message });
        break;
      case UserAlreadyExistsError:
        response.status(500).json({ message: error?.message });
        break;
    
      default:
        response.status(500).json({ message: error?.message || 'InternalServerError' });
        break;
    }
  }

  async handle(request: HttpRequest, response: HttpResponse): Promise<void> {
    try {
      const result = await this.usecase.execute(request.body as RegisterCustomerRequest);
      response.status(201).json(result);
    } catch (error) {
      this.mapError(error, response);
    }
  }
}
