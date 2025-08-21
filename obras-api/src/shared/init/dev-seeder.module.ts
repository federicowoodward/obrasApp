import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevSeederService } from './dev-seeder.service';

import { PlanLimit } from '../entities/plan-limit.entity';
import { Category } from '../entities/category.entity';
import { Architect } from '../entities/architect.entity';
import { Construction } from '../entities/construction.entity';
import { ConstructionWorker } from '../entities/construction-worker.entity';
import { Deposit } from '../entities/deposit.entity';
import { Element } from '../entities/element.entity';
import { ElementLocation } from '../entities/element-location.entity';
import { Note } from '../entities/note.entity';
import { Missing } from '../entities/missing.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlanLimit,
      Category,
      Architect,
      Construction,
      ConstructionWorker,
      Deposit,
      Element,
      ElementLocation,
      Note,
      Missing,
    ]),
  ],
  providers: [DevSeederService],
  exports: [DevSeederService],
})
export class DevSeederModule {}
