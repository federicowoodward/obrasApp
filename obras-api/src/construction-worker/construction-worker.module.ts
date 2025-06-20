import { Module } from '@nestjs/common';
import { ConstructionWorkerService } from './construction-worker.service';
import { ConstructionWorkerController } from './construction-worker.controller';

@Module({
  controllers: [ConstructionWorkerController],
  providers: [ConstructionWorkerService],
})
export class ConstructionWorkerModule {}
