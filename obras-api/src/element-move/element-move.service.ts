// src/element-move/element-move.service.ts
import { Injectable } from '@nestjs/common';
import { ElementLocationService } from 'src/element-location/element-location.service';
import { ElementMoveDetailService } from 'src/element-move-detail/element-move-detail.service';
import { MoveElementDto } from './dto/move-element.dto';
import { EventsHistoryLoggerService } from 'src/shared/services/events-history/events-history-logger.service';

@Injectable()
export class ElementMoveService {
  constructor(
    private readonly logger: EventsHistoryLoggerService,
    private readonly locationService: ElementLocationService,
    private readonly moveDetailService: ElementMoveDetailService,
  ) {}

  async move(dto: MoveElementDto) {
    // 1. Actualizar ubicación actual
    await this.locationService.updateLocation(dto.elementId, {
      locationType: dto.toType,
      locationId: dto.toId,
    });

    // 2. Log en EventsHistory
    const event = await this.logger.logEvent({
      table: 'element',
      recordId: dto.elementId,
      action: 'move',
      actorId: dto.movedBy,
      actorType: dto.movedByType,
      oldData: { locationType: dto.fromType, locationId: dto.fromId },
      newData: { locationType: dto.toType, locationId: dto.toId },
    });

    // 3. Guardar detalle
    await this.moveDetailService.saveMove({
      eventId: event.id,
      elementId: dto.elementId,
      fromType: dto.fromType,
      fromId: dto.fromId,
      toType: dto.toType,
      toId: dto.toId,
    });

    return { moved: true };
  }
}
