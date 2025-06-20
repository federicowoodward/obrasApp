import { Module } from '@nestjs/common';
import { ElementLocationService } from './element-location.service';
import { ElementLocationController } from './element-location.controller';

@Module({
  controllers: [ElementLocationController],
  providers: [ElementLocationService],
})
export class ElementLocationModule {}
