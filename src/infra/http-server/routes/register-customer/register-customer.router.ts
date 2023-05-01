import { Router } from 'express';
import { adapterController } from '../../adapter-controller';


export const registerCustomerRouter = Router();

registerCustomerRouter.post('/public/v1/register-customer', [ adapterController('RegisterCustomerController') ]);
