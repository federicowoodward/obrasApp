// src/config/orm-common.ts
import { DataSourceOptions } from 'typeorm';
import { join } from 'path';

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'postgres',
  synchronize: true,
  schema: 'public',
  entities: [join(__dirname, '..', 'shared/entities', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
};
