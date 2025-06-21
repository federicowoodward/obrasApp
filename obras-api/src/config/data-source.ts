// src/config/data-source.ts

import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'testdb',
  synchronize: false, // 👈 TAMBIÉN AQUÍ
  entities: ['src/shared/entities/*.entity.{ts,js}'],
  migrations: ['src/migrations/*.{ts,js}'],
});
