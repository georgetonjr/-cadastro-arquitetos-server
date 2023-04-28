import { DataSource } from 'typeorm';
import { config } from '../../../shared/config';
import { resolve } from 'path';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: config.DATABASE.USER,
  password: config.DATABASE.PASSWORD,
  database: config.DATABASE.DATABASE_NAME,
  entities: [],
  migrations: [resolve(__dirname, '../migrations/*{.ts, .js}')],
  synchronize: true,
});