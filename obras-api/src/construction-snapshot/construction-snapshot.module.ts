import { Module } from '@nestjs/common';
import { ConstructionSnapshotService } from './construction-snapshot.service';
import { ConstructionSnapshotController } from './construction-snapshot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstructionSnapshot } from 'src/shared/entities/construction-snapshot.entity';
import { Construction } from 'src/shared/entities/construction.entity';
import { EventsHistoryLoggerModule } from 'src/shared/services/events-history/events-history-logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConstructionSnapshot, Construction]),
    EventsHistoryLoggerModule,
  ],
  controllers: [ConstructionSnapshotController],
  providers: [ConstructionSnapshotService],
  exports: [ConstructionSnapshotService],
})
export class ConstructionSnapshotModule {}