import { Module } from '@nestjs/common';
import { ElementMoveController } from './element-move.controller';
import { ElementMoveService } from './element-move.service';
import { EventsHistoryLoggerModule } from 'src/shared/services/events-history/events-history-logger.module';
import { ElementLocationModule } from 'src/element-location/element-location.module';
import { ElementMoveDetailModule } from 'src/element-move-detail/element-move-detail.module';

@Module({
  imports: [
    EventsHistoryLoggerModule,
    ElementLocationModule,
    ElementMoveDetailModule,
  ],
  controllers: [ElementMoveController],
  providers: [ElementMoveService],
})
export class ElementMoveModule {}
