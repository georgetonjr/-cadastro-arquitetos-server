import { Router } from 'express';
import { adapterController } from '../../adapter-controller';



export const authCustomerRouter = Router();

authCustomerRouter.post('/public/v1/auth-customer', [ 
  adapterController('AuthCustomerController'), 
]);
