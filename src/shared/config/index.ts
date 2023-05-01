export const config = {
  ENVIRONMENT: process.env.NODE_ENV || 'dev',
  SERVER_PORT: Number(process.env.SERVER_PORT) || 9000,
  JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET',

  DATABASE: {
    HOST: process.env.DATABASE_HOST || 'localhost',
    PORT: Number(process.env.DATABASE_PORT) || 5432,
    DATABASE_NAME: process.env.DATABASE_NAME || 'crud_customer',
    USER: process.env.DATABASE_USER || 'postgres',
    PASSWORD: process.env.DATABASE_PASSWORD || 'postgres',
  },
};
