import express, { Express } from 'express';
export default async (): Promise<Express> => {
  const app = express();

  return app;
}