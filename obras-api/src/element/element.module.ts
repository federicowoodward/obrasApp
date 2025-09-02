import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element } from 'src/shared/entities/element.entity';
import { Category } from 'src/shared/entities/category.entity';
import { Architect } from 'src/shared/entities/architect.entity';
import { EventsHistory } from 'src/shared/entities/events-history.entity';
import { ElementService } from './element.service';
import { EventsHistoryLoggerService } from 'src/shared/services/events-history/events-history-logger.service';
import { ElementController } from './element.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([Element, Category, Architect, EventsHistory]),
  ],
  controllers: [ElementController],
  providers: [ElementService, EventsHistoryLoggerService],
  exports: [ElementService],
})
export class ElementModule {}
