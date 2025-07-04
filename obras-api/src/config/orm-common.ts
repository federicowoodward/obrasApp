// src/config/orm-common.ts
import { DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv';

config();

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  migrationsRun: true,
  schema: 'public',
  entities: [join(__dirname, '..', 'shared/entities', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
};
