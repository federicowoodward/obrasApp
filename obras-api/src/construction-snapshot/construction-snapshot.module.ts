import { Module } from '@nestjs/common';
import { ConstructionSnapshotService } from './construction-snapshot.service';
import { ConstructionSnapshotController } from './construction-snapshot.controller';

@Module({
  controllers: [ConstructionSnapshotController],
  providers: [ConstructionSnapshotService],
})
export class ConstructionSnapshotModule {}
