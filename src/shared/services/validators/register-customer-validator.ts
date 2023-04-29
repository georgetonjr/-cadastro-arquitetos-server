import { injectable } from 'tsyringe';
import { Validator } from '../../interface/validator';
import { RegisterCustomerRequest } from '../../../usecases/register-customer/domain/register-customer-request';
import Joi from 'joi';

@injectable()
export class RegisterCustomerValidator implements Validator<RegisterCustomerRequest> {
  validate(data: RegisterCustomerRequest) {
    const schema = Joi.object<RegisterCustomerRequest>().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      gender: Joi.string().valid('male', 'female').required(),
      age: Joi.number().required(),
      password: Joi.string().required(),
    });
    
    const validationResult = schema.validate(data);

    return {
      value: validationResult.error ? {} as RegisterCustomerRequest : validationResult.value,
      errorFields: validationResult.error?.details?.map(error => error.message) || [],
      isValid: !!(!validationResult.error),
    };
  }
}
