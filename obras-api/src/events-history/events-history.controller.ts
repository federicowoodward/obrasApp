import { Controller } from '@nestjs/common';
import { EventsHistoryService } from './events-history.service';

@Controller('events-history')
export class EventsHistoryController {
  constructor(private readonly eventsHistoryService: EventsHistoryService) {}
}
