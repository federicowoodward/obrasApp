import { Module } from '@nestjs/common';
import { ElementMoveDetailService } from './element-move-detail.service';
import { ElementMoveDetailController } from './element-move-detail.controller';
import { EventsHistoryLoggerModule } from 'src/shared/services/events-history/events-history-logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElementMoveDetail } from 'src/shared/entities/element-move-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ElementMoveDetail]),
  ],
  controllers: [ElementMoveDetailController],
  providers: [ElementMoveDetailService],
  exports: [ElementMoveDetailService]
})
export class ElementMoveDetailModule {}
