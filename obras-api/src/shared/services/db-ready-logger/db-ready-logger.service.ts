// src/shared/services/db-ready-logger.service.ts
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DbReadyLoggerService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DbReadyLoggerService.name);

  constructor(private dataSource: DataSource) {}

  async onApplicationBootstrap() {
    try {
      // Hace un simple ping
      await this.dataSource.query('SELECT 1');
      this.logger.log('✅ La base de datos está lista y conectada.');
    } catch (e) {
      this.logger.error('❌ Falló la conexión a la base de datos:', e);
    }
  }
}
