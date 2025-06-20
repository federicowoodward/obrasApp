import { Controller } from '@nestjs/common';
import { PlanLimitService } from './plan-limit.service';

@Controller('plan-limit')
export class PlanLimitController {
  constructor(private readonly planLimitService: PlanLimitService) {}
}
