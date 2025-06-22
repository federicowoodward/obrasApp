import { Module } from '@nestjs/common';
import { ConstructionWorkerService } from './construction-worker.service';
import { ConstructionWorkerController } from './construction-worker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstructionWorker } from 'src/shared/entities/construction-worker.entity';
import { Category } from 'src/shared/entities/category.entity';
import { Construction } from 'src/shared/entities/construction.entity';
import { Architect } from 'src/shared/entities/architect.entity';
import { EventsHistoryLoggerModule } from 'src/shared/services/events-history/events-history-logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConstructionWorker,
      Category,
      Construction,
      Architect,
    ]),
    EventsHistoryLoggerModule,
  ],
  controllers: [ConstructionWorkerController],
  providers: [ConstructionWorkerService],
})
export class ConstructionWorkerModule {}
