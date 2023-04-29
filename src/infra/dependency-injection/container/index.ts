import { Lifecycle, container } from 'tsyringe';
import { RegisterCustomer } from '../../../usecases/register-customer/register-customer-usecase';
import { 
  RegisterCustomerController, 
} from '../../../adapters/controllers/register-customer/register-customer-controller';
import { CustomerRepositoryTypeorm } from '../../../shared/orm/repositories/customer-repository-typeorm';
import { RegisterCustomerValidator } from '../../../shared/services/validators/register-customer-validator';
import { EncryptImplementation } from '../../../shared/services/encrypt/encrypt-implementation';

export const containerV1 = container.createChildContainer();

containerV1.register('RegisterCustomerUsecase', { useClass: RegisterCustomer });
containerV1.register('RegisterCustomerController', { useClass: RegisterCustomerController });

// repository
containerV1.register('CustomerRepository', { useClass: CustomerRepositoryTypeorm });

// services
containerV1.register(
  'RegisterCustomerValidator', 
  { useClass: RegisterCustomerValidator }, 
  { lifecycle: Lifecycle.Singleton },
);

containerV1.register(
  'Encrypt', 
  { useClass: EncryptImplementation }, 
  { lifecycle: Lifecycle.Singleton },
);

