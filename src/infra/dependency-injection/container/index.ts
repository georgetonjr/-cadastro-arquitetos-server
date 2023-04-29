import { Lifecycle, container } from 'tsyringe';
import { RegisterCustomer } from '../../../usecases/register-customer/register-customer-usecase';
import { 
  RegisterCustomerController, 
} from '../../../adapters/controllers/register-customer/register-customer-controller';
import { CustomerRepositoryTypeorm } from '../../../shared/orm/repositories/customer-repository-typeorm';
import { RegisterCustomerValidator } from '../../../shared/services/validators/register-customer-validator';
import { EncryptImplementation } from '../../../shared/services/encrypt/encrypt-implementation';
import { UuidGenerator } from '../../../shared/services/uuid/uuid-generator';
import { 
  RegisterArchitectController, 
} from '../../../adapters/controllers/register-architect/register-architect-controller';
import { ArchitectRepositoryTypeorm } from '../../../shared/orm/repositories/architect-repository-typeorm';
import { RegisterArchitect } from '../../../usecases/register-architect/register-architect-usecase';

export const containerV1 = container.createChildContainer();

containerV1.register('RegisterCustomerUsecase', { useClass: RegisterCustomer });
containerV1.register('RegisterCustomerController', { useClass: RegisterCustomerController });
containerV1.register('RegisterArchitectController', { useClass: RegisterArchitectController });
containerV1.register('RegisterArchitectUsecase', { useClass: RegisterArchitect });

// repository
containerV1.register('CustomerRepository', { useClass: CustomerRepositoryTypeorm });
containerV1.register('ArchitectRepository', { useClass: ArchitectRepositoryTypeorm });

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

containerV1.register(
  'IdentifierGenerator', 
  { useClass: UuidGenerator }, 
  { lifecycle: Lifecycle.Singleton },
);



