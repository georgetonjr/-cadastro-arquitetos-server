import express, { Express } from 'express';
import { setupProviders } from '../providers';
export default async (): Promise<Express> => {
  const app = express();
  await setupProviders();
  return app;
}