import { Module } from '@nestjs/common';
import { EventsHistoryService } from './events-history.service';
import { EventsHistoryController } from './events-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsHistory } from 'src/shared/entities/events-history.entity';

@Module({
  controllers: [EventsHistoryController],
  providers: [EventsHistoryService],
  imports: [TypeOrmModule.forFeature([EventsHistory])],
})
export class EventsHistoryModule {}
