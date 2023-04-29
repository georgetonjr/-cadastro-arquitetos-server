import { Express, Response } from 'express';
import { registerCustomerRouter } from './register-customer/register-customer.router';

export const setupRoutes = (app: Express) => {
  app.get('/health', (_, res: Response) => {
    res.status(200).json({
      status: 'up',
      upTime: process.uptime(),
    });
  });

  app.use('/api', [
    registerCustomerRouter,
  ]);
};
