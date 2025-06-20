import { Module } from '@nestjs/common';
import { EventsHistoryService } from './events-history.service';
import { EventsHistoryController } from './events-history.controller';

@Module({
  controllers: [EventsHistoryController],
  providers: [EventsHistoryService],
})
export class EventsHistoryModule {}
