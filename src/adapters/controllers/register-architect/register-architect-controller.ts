import { inject, injectable } from 'tsyringe';
import { HttpResponse } from '../../../shared/interface/ http-response';
import { Controller } from '../../../shared/interface/controller';
import { HttpRequest } from '../../../shared/interface/http-request';
import { InvalidDataError } from '../../../shared/errors/invalid-data-error';
import { UserAlreadyExistsError } from '../../../shared/errors/user-already-exists-error';
import { RegisterArchitectUsecase } from '../../../usecases/register-architect/register-architect-usecase';
import { RegisterArchitectRequest } from '../../../usecases/register-architect/domain/register-architect-request';

@injectable()
export class RegisterArchitectController implements Controller {
  constructor(
    @inject('RegisterArchitectUsecase')
    private readonly usecase: RegisterArchitectUsecase,
  ) {}

  private mapError(error: Error, response: HttpResponse) {
    switch (error.constructor) {
      case InvalidDataError:
        response.status(422).json({ message: error?.message });
        break;
      case UserAlreadyExistsError:
        response.status(400).json({ message: error?.message });
        break;
    
      default:
        response.status(500).json({ message: error?.message || 'InternalServerError' });
        break;
    }
  }

  async handle(request: HttpRequest, response: HttpResponse): Promise<void> {
    try {
      const result = await this.usecase.execute(request.body as RegisterArchitectRequest);
      response.status(201).json(result);
    } catch (error) {
      this.mapError(error, response);
    }
  }
}
