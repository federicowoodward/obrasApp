import { Controller } from '@nestjs/common';
import { ConstructionSnapshotService } from './construction-snapshot.service';

@Controller('construction-snapshot')
export class ConstructionSnapshotController {
  constructor(private readonly constructionSnapshotService: ConstructionSnapshotService) {}
}
