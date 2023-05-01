import { injectable } from 'tsyringe';
import { Validator } from '../../interface/validator';
import Joi from 'joi';
import { CreateOrderServiceRequest } from '../../../usecases/create-order-service/domain/create-order-service-request';

@injectable()
export class CreateOrderServiceValidator implements Validator<CreateOrderServiceRequest> {
  validate(data: CreateOrderServiceRequest) {
    const schema = Joi.object<CreateOrderServiceRequest>().keys({
      title: Joi.string().required(),
      user: Joi.object().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
    });
    
    const validationResult = schema.validate(data);

    return {
      value: validationResult.error ? {} as CreateOrderServiceRequest : validationResult.value,
      errorFields: validationResult.error?.details?.map(error => error.message) || [],
      isValid: !!(!validationResult.error),
    };
  }
}
