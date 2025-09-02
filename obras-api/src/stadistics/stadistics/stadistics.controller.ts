import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StadisticsService } from './stadistics.service';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Stadistics')
@Controller('architect/:architectId/stadistics')
export class StadisticsController {
  constructor(private readonly service: StadisticsService) {}

  @Get()
  @ApiOperation({ summary: 'Big numbers + últimos movimientos del arquitecto' })
  @ApiParam({ name: 'architectId', type: Number })
  get(@Param('architectId', ParseIntPipe) architectId: number) {
    return this.service.getForArchitect(architectId);
  }
}
