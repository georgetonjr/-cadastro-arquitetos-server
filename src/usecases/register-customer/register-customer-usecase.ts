import { inject, injectable } from 'tsyringe';
import { Usecase } from '../../shared/interface/usecase';
import { RegisterCustomerRequest } from './domain/register-customer-request';
import { CustomerRepository } from '../port/repositories/customer-repository';
import { Validator } from '../../shared/interface/validator';
import { InvalidDataError } from '../../shared/errors/invalid-data-error';
import { Customer } from '../../entities/customer';
import { RegisterCustomerResponse } from './domain/register-customer-response';
import { EncryptComposition } from './domain/encrypt-composition';

export interface RegisterCustomeUsecase extends Usecase<RegisterCustomerRequest, RegisterCustomerResponse | Error> {}

@injectable()
export class RegisterCustomer implements RegisterCustomeUsecase {
  constructor(
    @inject('CustomerRepository')
    private readonly repository: CustomerRepository,
    @inject('RegisterCustomerValidator')
    private readonly validator: Validator<RegisterCustomerRequest>,
    @inject('Encrypt')
    private readonly encrypt: EncryptComposition,
  ) {}
  
  async execute(payload: RegisterCustomerRequest): Promise<RegisterCustomerResponse | Error> {
    try {
      const { errorFields, isValid } = this.validator.validate(payload);
      if (!isValid) {
        throw new InvalidDataError(errorFields);
      }
      const customer = await this.buildCustomer(payload);
      const token = this.encrypt.jwtSign(customer);

      return { token };
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }

  private async buildCustomer(data: RegisterCustomerRequest): Promise<Customer> {
    const customer = new Customer({
      ...data,
      password: this.encrypt.encryptEncode(data.password),
    });
    await this.repository.save(customer);
    delete customer.password;
    return customer;
  }
}
