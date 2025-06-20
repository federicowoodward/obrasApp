import { DataSourceOptions } from 'typeorm';
import { join } from 'path';

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost', // o 'db' si estás en Docker Compose
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'testdb',
  synchronize: true, // solo en desarrollo, cuidado en producción
  entities: [join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
};
