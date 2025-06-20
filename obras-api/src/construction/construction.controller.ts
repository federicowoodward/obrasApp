import { Controller } from '@nestjs/common';
import { ConstructionService } from './construction.service';

@Controller('construction')
export class ConstructionController {
  constructor(private readonly constructionService: ConstructionService) {}
}
