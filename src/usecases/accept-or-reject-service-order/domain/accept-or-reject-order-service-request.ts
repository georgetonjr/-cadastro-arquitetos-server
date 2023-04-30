import { Architect } from '../../../entities/architect';
import { Customer } from '../../../entities/customer';

export interface AcceptOrRejectOrderServiceRequest {
  action: 'accept' | 'reject';
  orderServiceId: string;
  user: Architect | Customer;
}
