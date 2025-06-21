// src/config/typeorm.config.ts

import { DataSourceOptions } from 'typeorm';
import { join } from 'path';

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'testdb',
  synchronize: false, // 👈 CAMBIALO
  entities: [join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
};
