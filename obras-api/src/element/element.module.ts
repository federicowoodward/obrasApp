import { Module } from '@nestjs/common';
import { ElementService } from './element.service';
import { ElementController } from './element.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/shared/entities/category.entity';
import { Architect } from 'src/shared/entities/architect.entity';
import { Element } from 'src/shared/entities/element.entity';
import { EventsHistoryLoggerModule } from 'src/shared/services/events-history/events-history-logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Element, Category, Architect]),
    EventsHistoryLoggerModule,
  ],
  controllers: [ElementController],
  providers: [ElementService],
})
export class ElementModule {}
