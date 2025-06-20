import { Module } from '@nestjs/common';
import { MissingService } from './missing.service';
import { MissingController } from './missing.controller';

@Module({
  controllers: [MissingController],
  providers: [MissingService],
})
export class MissingModule {}
