import { injectable } from 'tsyringe';
import { Validator } from '../../interface/validator';
import Joi from 'joi';
import { AuthCustomerRequest } from '../../../usecases/auth-customer/domain/auth-customer-request';

@injectable()
export class AuthValidator implements Validator<AuthCustomerRequest> {
  validate(data: AuthCustomerRequest) {
    const schema = Joi.object<AuthCustomerRequest>().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    
    const validationResult = schema.validate(data);

    return {
      value: validationResult.error ? {} as AuthCustomerRequest : validationResult.value,
      errorFields: validationResult.error?.details?.map(error => error.message) || [],
      isValid: !!(!validationResult.error),
    };
  }
}
