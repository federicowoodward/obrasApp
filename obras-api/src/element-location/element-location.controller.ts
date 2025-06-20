import { Controller } from '@nestjs/common';
import { ElementLocationService } from './element-location.service';

@Controller('element-location')
export class ElementLocationController {
  constructor(private readonly elementLocationService: ElementLocationService) {}
}
