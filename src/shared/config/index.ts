export const config = {
  SERVER_PORT: 3000,

  DATABASE: {
    HOST: process.env.DATABASE_HOST || 'localhost',
    PORT: Number(process.env.DATABASE_PORT) || 5432,
    DATABASE_NAME: process.env.DATABASE_NAME || 'crud_customer',
    USER: process.env.DATABASE_USER || 'postgres',
    PASSWORD: process.env.DATABASE_PASSWORD || 'postgres',
  },
};
