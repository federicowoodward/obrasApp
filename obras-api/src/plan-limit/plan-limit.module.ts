import { Module } from '@nestjs/common';
import { PlanLimitService } from './plan-limit.service';
import { PlanLimitController } from './plan-limit.controller';

@Module({
  controllers: [PlanLimitController],
  providers: [PlanLimitService],
})
export class PlanLimitModule {}
