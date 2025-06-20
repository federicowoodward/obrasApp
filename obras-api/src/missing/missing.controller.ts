import { Controller } from '@nestjs/common';
import { MissingService } from './missing.service';

@Controller('missing')
export class MissingController {
  constructor(private readonly missingService: MissingService) {}
}
