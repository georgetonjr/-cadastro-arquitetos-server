import { Router } from 'express';
import { adapterController } from '../../adapter-controller';

export const listOrderServiceRouter = Router();

listOrderServiceRouter.get('/public/v1/list-order-service', [ 
  adapterController('ListOrderServiceController'), 
]);
