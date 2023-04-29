

import { Router } from 'express';
import { adapterController } from '../../adapter-controller';
import { verifyToken } from '../../../../shared/middleware/verify-token-middleware';


export const createOrderServiceRouter = Router();

createOrderServiceRouter.post('/public/v1/create-order-service', [ 
  verifyToken,
  adapterController('CreateOrderServiceController'), 
]);
