import { Module } from '@nestjs/common';
import { ConstructionService } from './construction.service';
import { ConstructionController } from './construction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Construction } from 'src/shared/entities/construction.entity';
import { Architect } from 'src/shared/entities/architect.entity';
import { EventsHistoryLoggerModule } from 'src/shared/services/events-history/events-history-logger.module';
import { ConstructionSnapshotModule } from 'src/construction-snapshot/construction-snapshot.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Construction, Architect]),
    EventsHistoryLoggerModule,
    ConstructionSnapshotModule
  ],
  controllers: [ConstructionController],
  providers: [ConstructionService],
})
export class ConstructionModule {}
