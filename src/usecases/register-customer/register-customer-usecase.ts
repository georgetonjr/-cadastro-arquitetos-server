import { inject, injectable } from 'tsyringe';
import { Usecase } from '../../shared/interface/usecase';
import { RegisterCustomerRequest } from './domain/register-customer-request';
import { CustomerRepository } from '../port/repositories/customer-repository';
import { Validator } from '../../shared/interface/validator';
import { InvalidDataError } from '../../shared/errors/invalid-data-error';
import { Encrypt } from '../port/encrypt';
import { Customer } from '../../entities/customer';
import { RegisterCustomerResponse } from './domain/register-customer-response';

export interface RegisterCustomeUsecase extends Usecase<RegisterCustomerRequest, RegisterCustomerResponse | Error> {}

@injectable()
export class RegisterCustomer implements RegisterCustomeUsecase {
  constructor(
    @inject('CustomerRepository')
    private readonly repository: CustomerRepository,
    @inject('RegisterCustomerValidator')
    private readonly validator: Validator<RegisterCustomerRequest>,
    @inject('Encrypt')
    private readonly encrypt: Encrypt,
  ) {}
  
  async execute(payload: RegisterCustomerRequest): Promise<RegisterCustomerResponse | Error> {
    try {
      const { errorFields, isValid } = this.validator.validate(payload);
      if (!isValid) {
        throw new InvalidDataError(errorFields);
      }
      const customer = await this.buildCustomer(payload);
      const token = this.encrypt.jwtGenerate(customer);

      return { token };
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }

  private async buildCustomer(data: RegisterCustomerRequest): Promise<Customer> {
    const customer = new Customer({
      ...data,
      password: this.encrypt.encrypt(data.password),
    });
    await this.repository.save(customer);
    delete customer.password;
    return customer;
  }
}
