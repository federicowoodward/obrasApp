import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevSeederService } from './dev-seeder.service';
import { ElementLocation } from '../entities/element-location.entity';
import { Note } from '../entities/note.entity';
import { Missing } from '../entities/missing.entity';
import { Architect } from '../entities/architect.entity';
import { Construction } from '../entities/construction.entity';
import { ConstructionWorker } from '../entities/construction-worker.entity';
import { Deposit } from '../entities/deposit.entity';
import { Element } from '../entities/element.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Element,
      Architect,
      Construction,
      ConstructionWorker,
      Deposit,
      ElementLocation,
      Note,
      Missing,
    ]),
  ],
  providers: [DevSeederService],
  exports: [DevSeederService],
})
export class DevSeederModule {}
