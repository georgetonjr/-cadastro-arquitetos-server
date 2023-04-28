import { inject, injectable } from 'tsyringe';
import { HttpResponse } from '../../../shared/interface/ http-response';
import { Controller } from '../../../shared/interface/controller';
import { HttpRequest } from '../../../shared/interface/http-request';
import { RegisterCustomeUsecase } from '../../../usecases/register-customer/register-customer-usecase';
import { RegisterCustomerRequest } from '../../../usecases/register-customer/domain/register-customer-request';

@injectable()
export class RegisterCustomerController implements Controller {
  constructor(
    @inject('RegisterCustomerUsecase')
    private readonly usecase: RegisterCustomeUsecase,
  ) {}

  async handle(request: HttpRequest, response: HttpResponse): Promise<void> {
    try {
      await this.usecase.execute(request.body as RegisterCustomerRequest);
      response.sendStatus(200);
    } catch (error) {
      response.json(error);
    }
  }
}
