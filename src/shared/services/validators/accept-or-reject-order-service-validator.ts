


import { injectable } from 'tsyringe';
import { Validator } from '../../interface/validator';
import Joi from 'joi';
import { AcceptOrRejectOrderServiceRequest, 
} from '../../../usecases/accept-or-reject-service-order/domain/accept-or-reject-order-service-request';


@injectable()
export class AcceptOrRejectOrderServiceValidator implements Validator<AcceptOrRejectOrderServiceRequest> {
  validate(data: AcceptOrRejectOrderServiceRequest) {
    const schema = Joi.object<AcceptOrRejectOrderServiceRequest>().keys({
      user: Joi.object().required(),
      action: Joi.string().valid('accept', 'reject').required(),
      orderServiceId: Joi.string().required(),
    });
    
    const validationResult = schema.validate(data);

    return {
      value: validationResult.error ? {} as AcceptOrRejectOrderServiceRequest : validationResult.value,
      errorFields: validationResult.error?.details?.map(error => error.message) || [],
      isValid: !!(!validationResult.error),
    };
  }
}
