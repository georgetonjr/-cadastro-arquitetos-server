import { DataSource } from 'typeorm';
import { config } from '../../../shared/config';
import { resolve } from 'path';

export const dataSource = new DataSource({
  type: 'postgres',
  host: config.DATABASE.HOST,
  port: 5432,
  username: config.DATABASE.USER,
  password: config.DATABASE.PASSWORD,
  database: config.DATABASE.DATABASE_NAME,
  entities: [resolve(__dirname, '../../.../../../shared/orm/entities/*{.ts, .js}')],
  migrations: [resolve(__dirname, '../../.../../../shared/orm/migrations/*{.ts, .js}')],
  synchronize: true,
});
