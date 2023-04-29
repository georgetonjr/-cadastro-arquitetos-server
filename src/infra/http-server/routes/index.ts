import { Express, Response } from 'express';
import { registerCustomerRouter } from './register-customer/register-customer.router';
import { registerArchitectRouter } from './register-architect/register-architect.router';
import { createOrderServiceRouter } from './create-order-service/create-order-service.router';
import { listOrderServiceRouter } from './list-order-service/list-order-service.router';

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
  ]);
};
