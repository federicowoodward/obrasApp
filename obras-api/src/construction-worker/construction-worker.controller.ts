import { Controller } from '@nestjs/common';
import { ConstructionWorkerService } from './construction-worker.service';

@Controller('construction-worker')
export class ConstructionWorkerController {
  constructor(private readonly constructionWorkerService: ConstructionWorkerService) {}
}
