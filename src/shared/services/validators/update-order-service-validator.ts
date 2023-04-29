import { injectable } from 'tsyringe';
import { Validator } from '../../interface/validator';
import Joi from 'joi';
import { UpdateOrderServiceRequest } from '../../../usecases/update-order-service/domain/update-order-service-request';

@injectable()
export class UpdateOrderServiceValidator implements Validator<UpdateOrderServiceRequest> {
  validate(data: UpdateOrderServiceRequest) {
    const schema = Joi.object<UpdateOrderServiceRequest>().keys({
      id: Joi.string().required(),
      updateOptions: Joi.object().keys({
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        price: Joi.number().optional(),
        isActive: Joi.boolean().optional(),
        show: Joi.boolean().optional(),
      }).required(),
    }).required();
    
    const validationResult = schema.validate(data);

    return {
      value: validationResult.error ? {} as UpdateOrderServiceRequest : validationResult.value,
      errorFields: validationResult.error?.details?.map(error => error.message) || [],
      isValid: !!(!validationResult.error),
    };
  }
}
