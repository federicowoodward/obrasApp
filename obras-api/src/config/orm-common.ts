// src/config/orm-common.ts
import { DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv';
config();

const isDev = process.env.NODE_ENV === 'development';

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  schema: 'public',

  // En dev: rehacer todo y NO correr migraciones
  synchronize: isDev,
  dropSchema: isDev,
  migrationsRun: !isDev,

  // IMPORTANTE: que el path de entidades coincida con donde realmente están
  entities: [join(__dirname, '..', 'shared/entities', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
};
