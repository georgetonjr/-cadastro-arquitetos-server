import { inject, injectable } from 'tsyringe';
import { Usecase } from '../../shared/interface/usecase';
import { RegisterCustomerRequest } from './domain/register-customer-request';
import { CustomerRepository } from '../port/repositories/customer-repository';
import { Validator } from '../../shared/interface/validator';
import { InvalidDataError } from '../../shared/errors/invalid-data-error';

export interface RegisterCustomeUsecase extends Usecase<RegisterCustomerRequest, any> {}

@injectable()
export class RegisterCustomer implements RegisterCustomeUsecase {
  constructor(
    @inject('CustomerRepository')
    private readonly repository: CustomerRepository,
    @inject('RegisterCustomerValidator')
    private readonly validator: Validator<RegisterCustomerRequest>,
  ) {}
  
  async execute(payload: RegisterCustomerRequest) {
    // validar payload
    const validator = this.validator.validate(payload);
    if (!validator.isValid) {
      throw new InvalidDataError(validator.errorFields);
    }
    // await this.repository.save(payload);

    return { 
      payload, 
      ok: true,
    };
  }
}
