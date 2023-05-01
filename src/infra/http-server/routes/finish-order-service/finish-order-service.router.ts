import { Router } from 'express';
import { adapterController } from '../../adapter-controller';
import { verifyToken } from '../../../../shared/middleware/verify-token-middleware';

export const finishServiceOrderRouter = Router();

finishServiceOrderRouter.put(
  '/public/v1/finish-service-order/:id', 
  [ 
    verifyToken,
    adapterController('FinishOrderServiceController'),
  ],
);
