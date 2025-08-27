// src/modules/missing/missing.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Missing } from '../shared/entities/missing.entity';
import { Construction } from '../shared/entities/construction.entity';
import { Architect } from '../shared/entities/architect.entity';
import { ConstructionWorker } from '../shared/entities/construction-worker.entity';
import { MissingService } from './missing.service';
import { MissingController } from './missing.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Missing,
      Construction,
      Architect,
      ConstructionWorker,
    ]),
  ],
  controllers: [MissingController],
  providers: [MissingService],
  exports: [TypeOrmModule, MissingService],
})
export class MissingModule {}
