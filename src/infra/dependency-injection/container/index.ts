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
import {
  CreateOrderServiceController,
} from '../../../adapters/controllers/create-order-service/create-order-service-controller';
import { CreateOrderServiceValidator } from '../../../shared/services/validators/create-service-order-validator';
import { CreateOrderService } from '../../../usecases/create-order-service/create-order-service-usecase';
import { OrderServiceRepositoryTypeorm } from '../../../shared/orm/repositories/order-service-repository-typeorm';
import { ListOrderService } from '../../../usecases/list-order-service/list-order-service-usecase';
import {
  ListOrderServiceController,
} from '../../../adapters/controllers/list-order-service/list-order-service-controller';
import { UpdateOrderService } from '../../../usecases/update-order-service/update-order-service-usecase';
import {
  UpdaterderServiceController,
} from '../../../adapters/controllers/update-order-service/update-order-service-controller';
import { UpdateOrderServiceValidator } from '../../../shared/services/validators/update-order-service-validator';
import { AuthCustomer } from '../../../usecases/auth-customer/auth-customer-usecase';
import { AuthCustomerController } from '../../../adapters/controllers/auth-customer/auth-customer-controller';
import { AuthValidator } from '../../../shared/services/validators/auth-validator';
import { AuthArchitectController } from '../../../adapters/controllers/auth-architect/auth-architect-controller';
import { AuthArchitect } from '../../../usecases/auth-architect/auth-architect-usecase';
import { 
  AcceptOrRejectOrderService, 
} from '../../../usecases/accept-or-reject-service-order/accept-or-reject-order-service-usecase';
import {
  AcceptOrRejectOrderServiceController, 
} from '../../../adapters/controllers/accept-or-reject-service-order/accept-or-reject-service-order-controller';
import { AcceptOrRejectOrderServiceValidator } from '../../../shared/services/validators/accept-or-reject-order-service-validator';


export const containerV1 = container.createChildContainer();

containerV1.register('RegisterCustomerUsecase', { useClass: RegisterCustomer });
containerV1.register('RegisterCustomerController', { useClass: RegisterCustomerController });
containerV1.register('RegisterArchitectController', { useClass: RegisterArchitectController });
containerV1.register('RegisterArchitectUsecase', { useClass: RegisterArchitect });
containerV1.register('CreateOrderServiceController', { useClass: CreateOrderServiceController });
containerV1.register('CreateOrderServiceUsecase', { useClass: CreateOrderService });

containerV1.register('ListOrderServiceUsecase', { useClass: ListOrderService });
containerV1.register('ListOrderServiceController', { useClass: ListOrderServiceController });

containerV1.register('UpdateOrderServiceUsecase', { useClass: UpdateOrderService });
containerV1.register('UpdaterderServiceController', { useClass: UpdaterderServiceController });

containerV1.register('AuthCustomerController', { useClass: AuthCustomerController });
containerV1.register('AuthCustomerUsecase', { useClass: AuthCustomer });


containerV1.register('AcceptOrRejectOrderServiceUsecase', { useClass: AcceptOrRejectOrderService });
containerV1.register('AcceptOrRejectOrderServiceController', { useClass: AcceptOrRejectOrderServiceController });

containerV1.register('AcceptOrRejectOrderServiceValidator', { useClass: AcceptOrRejectOrderServiceValidator });


containerV1.register('UpdateOrderServiceValidator', { useClass: UpdateOrderServiceValidator });
containerV1.register('CreateOrderServiceValidator', { useClass: CreateOrderServiceValidator });

containerV1.register('AuthArchitectController', { useClass: AuthArchitectController });
containerV1.register('AuthArchitectUsecase', { useClass: AuthArchitect });

containerV1.register('AuthValidator', { useClass: AuthValidator });

// repository
containerV1.register('CustomerRepository', { useClass: CustomerRepositoryTypeorm });
containerV1.register('ArchitectRepository', { useClass: ArchitectRepositoryTypeorm });
containerV1.register('OrderServiceRepository', { useClass: OrderServiceRepositoryTypeorm });

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



