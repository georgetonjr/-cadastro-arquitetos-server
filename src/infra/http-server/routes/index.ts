import { Express, Response } from 'express';

export const setupRoutes = (app: Express) => {
  app.get('/health', (_, res: Response) => {
    res.status(200).json({
      status: 'up',
      upTime: process.uptime(),
    });
  });

  // app.use('/api', []);
};
