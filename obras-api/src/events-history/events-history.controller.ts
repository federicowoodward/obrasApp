import { Controller, Get } from '@nestjs/common';
import { EventsHistoryService } from './events-history.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EventsHistory } from 'src/shared/entities/events-history.entity';

@ApiTags('Historial de eventos')
@Controller('events-history')
export class EventsHistoryController {
  constructor(private readonly service: EventsHistoryService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los eventos del historial' })
  @ApiResponse({ status: 200, type: [EventsHistory] })
  findAll() {
    return this.service.findAll();
  }
}
