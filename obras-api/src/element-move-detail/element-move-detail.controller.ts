import { Controller } from '@nestjs/common';
import { ElementMoveDetailService } from './element-move-detail.service';

@Controller('element-move-detail')
export class ElementMoveDetailController {
  constructor(private readonly elementMoveDetailService: ElementMoveDetailService) {}
}
