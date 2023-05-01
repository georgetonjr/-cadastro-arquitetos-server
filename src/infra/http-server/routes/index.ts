import { Express, Response } from 'express';
import { registerCustomerRouter } from './register-customer/register-customer.router';
import { registerArchitectRouter } from './register-architect/register-architect.router';
import { createOrderServiceRouter } from './create-order-service/create-order-service.router';
import { listOrderServiceRouter } from './list-order-service/list-order-service.router';
import { updateServiceOrderRouter } from './update-service-order/update-service-order.router';
import { authCustomerRouter } from './auth-consumer/auth-consumer.router';
import { authArchitectRouter } from './auth-architect/auth-architect.router';
import { 
  acceptOrRejectOrderServiceRouter, 
} from './accept-or-reject-service-order/accept-or-reject-service-order.router';
import { finishServiceOrderRouter } from './finish-order-service/finish-order-service.router';

export const setupRoutes = (app: Express) => {
  app.get('/health', (_, res: Response) => {
    res.status(200).json({
      status: 'up',
      upTime: process.uptime(),
    });
  });

  app.use('/api', [
    registerCustomerRouter,
    registerArchitectRouter,
    createOrderServiceRouter,
    listOrderServiceRouter,
    updateServiceOrderRouter,
    authCustomerRouter,
    authArchitectRouter,
    acceptOrRejectOrderServiceRouter,
    finishServiceOrderRouter,
  ]);
};
