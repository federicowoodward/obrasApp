// src/construction-snapshot/construction-snapshot.controller.ts
import { Controller, Post, Param } from '@nestjs/common';
import { ConstructionSnapshotService } from './construction-snapshot.service';

@Controller('construction-snapshot')
export class ConstructionSnapshotController {
  constructor(private readonly snapshotService: ConstructionSnapshotService) {}

  @Post(':eventId/restore')
  restore(@Param('eventId') eventId: number) {
    return this.snapshotService.restoreSnapshot(+eventId);
  }
}
