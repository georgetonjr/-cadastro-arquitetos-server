import { Router } from 'express';
import { adapterController } from '../../adapter-controller';
import { verifyToken } from '../../../../shared/middleware/verify-token-middleware';



export const acceptOrRejectOrderServiceRouter = Router();

acceptOrRejectOrderServiceRouter.patch('/public/v1/update-order-service/:orderServiceId/:action', [ 
  verifyToken,
  adapterController('AcceptOrRejectOrderServiceController'), 
]);
