import { injectable } from 'tsyringe';
import { Validator } from '../../interface/validator';
import Joi from 'joi';
import { FinishOrderServiceRequest } from 'src/usecases/finish-order-service/domain/finish-order-service-request';

@injectable()
export class FinishOrderServiceValidator implements Validator<FinishOrderServiceRequest> {
  validate(data: FinishOrderServiceRequest) {
    const schema = Joi.object<FinishOrderServiceRequest>().keys({
      orderServiceId: Joi.string().uuid().required(),
    });
    
    const validationResult = schema.validate(data);

    return {
      value: validationResult.error ? {} as FinishOrderServiceRequest : validationResult.value,
      errorFields: validationResult.error?.details?.map(error => error.message) || [],
      isValid: !!(!validationResult.error),
    };
  }
}
