import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StadisticsService } from './stadistics.service';
import { StadisticsController } from './stadistics.controller';

import { Construction } from 'src/shared/entities/construction.entity';
import { ConstructionWorker } from 'src/shared/entities/construction-worker.entity';
import { Deposit } from 'src/shared/entities/deposit.entity';
import { Element } from 'src/shared/entities/element.entity';
import { Note } from 'src/shared/entities/note.entity';
import { Missing } from 'src/shared/entities/missing.entity';
import { EventsHistory } from 'src/shared/entities/events-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Construction,
      ConstructionWorker,
      Deposit,
      Element,
      Note,
      Missing,
      EventsHistory,
    ]),
  ],
  controllers: [StadisticsController],
  providers: [StadisticsService],
  exports: [StadisticsService],
})
export class StadisticsModule {}
