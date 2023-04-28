import express, { Express } from 'express';
import { setupProviders } from '../providers';
import { setupRoutes } from './routes';

export default async (): Promise<Express> => {
  const app = express();

  await setupProviders();
  setupRoutes(app);
  return app;
};
