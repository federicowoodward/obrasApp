import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element } from 'src/shared/entities/element.entity';
import { EventsHistory } from 'src/shared/entities/events-history.entity';
import { ElementMoveService } from './element-move.service';
import { EventsHistoryLoggerService } from 'src/shared/services/events-history/events-history-logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Element, EventsHistory])],
  providers: [ElementMoveService, EventsHistoryLoggerService],
  exports: [ElementMoveService],
})
export class ElementMoveModule {}
