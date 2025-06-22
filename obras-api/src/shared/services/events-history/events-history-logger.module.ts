import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsHistory } from 'src/shared/entities/events-history.entity';
import { EventsHistoryLoggerService } from './events-history-logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventsHistory])],
  providers: [EventsHistoryLoggerService],
  exports: [EventsHistoryLoggerService],
})
export class EventsHistoryLoggerModule {}