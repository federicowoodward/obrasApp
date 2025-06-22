// src/config/data-source.ts
import { DataSource } from 'typeorm';
import { ormConfig } from './orm-common';

export const AppDataSource = new DataSource(ormConfig);
