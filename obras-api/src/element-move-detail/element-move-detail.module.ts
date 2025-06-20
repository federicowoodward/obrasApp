import { Module } from '@nestjs/common';
import { ElementMoveDetailService } from './element-move-detail.service';
import { ElementMoveDetailController } from './element-move-detail.controller';

@Module({
  controllers: [ElementMoveDetailController],
  providers: [ElementMoveDetailService],
})
export class ElementMoveDetailModule {}
