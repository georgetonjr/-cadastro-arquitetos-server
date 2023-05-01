import { inject, injectable } from 'tsyringe';
import { Usecase } from '../../shared/interface/usecase';
import { CustomerRepository } from '../port/repositories/customer-repository';
import { AuthCustomerRequest } from './domain/auth-customer-request';
import { AuthCustomerResponse } from './domain/auth-customer-response';
import { CustomerNotFoundError } from '../../shared/errors/customer-not-found-error';
import { EncryptVerify } from '../port/encrypt/encrypt-verify';
import { JwtSign } from '../port/encrypt/jwt-sign';
import { InvalidDataError } from '../../shared/errors/invalid-data-error';
import { Validator } from '../../shared/interface/validator';
import { AuthError } from '../../shared/errors/auth-error';

export interface AuthCustomerUsecase extends Usecase<AuthCustomerRequest, AuthCustomerResponse> {}

interface EncryptVerifyAndSign extends EncryptVerify, JwtSign {}
@injectable()
export class AuthCustomer implements AuthCustomerUsecase {
  constructor(
    @inject('CustomerRepository')
    private readonly repository: CustomerRepository,
    @inject('Encrypt')
    private readonly encrypt: EncryptVerifyAndSign,
    @inject('AuthValidator')
    private readonly validator: Validator<AuthCustomerRequest>,
  ) {}

  async execute(payload: AuthCustomerRequest): Promise<AuthCustomerResponse> {
    try {
      const { errorFields, isValid } = this.validator.validate(payload);
      if (!isValid) {
        throw new InvalidDataError(errorFields);
      }
      const customer = await this.repository.findOne({ email: payload.email });

      if (!customer) {
        throw new CustomerNotFoundError();
      }

      const isPasswordMatch = this.encrypt.encryptVerify(payload.password, customer.password);

      if (!isPasswordMatch) {
        throw new AuthError();
      }
      
      delete customer.password;
      const token = this.encrypt.jwtSign(customer);

      return { token };
    } catch (error) {
      throw error;
    }
  }

}
