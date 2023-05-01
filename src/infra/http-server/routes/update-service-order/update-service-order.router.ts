import { Router } from 'express';
import { adapterController } from '../../adapter-controller';
import { verifyToken } from '../../../../shared/middleware/verify-token-middleware';


export const updateServiceOrderRouter = Router();

updateServiceOrderRouter.put(
  '/public/v1/update-service-order/:id', 
  [ 
    verifyToken,
    adapterController('UpdaterderServiceController'),
  ],
);
