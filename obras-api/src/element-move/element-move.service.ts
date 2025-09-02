import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Element } from 'src/shared/entities/element.entity';
import { EventsHistoryLoggerService } from 'src/shared/services/events-history/events-history-logger.service';
import { MoveElementDto } from './dto/move-element.dto';

@Injectable()
export class ElementMoveService {
  constructor(
    private readonly logger: EventsHistoryLoggerService,
    @InjectRepository(Element)
    private readonly elementRepo: Repository<Element>,
  ) {}

  async move(dto: MoveElementDto) {
    const element = await this.elementRepo.findOneBy({ id: dto.elementId });
    if (!element) {
      // Podés lanzar NotFoundException si preferís
      return { moved: false };
    }

    // no-op si es el mismo lugar
    if (
      element.currentLocationType === dto.toType &&
      element.currentLocationId === dto.toId
    ) {
      return { moved: false };
    }

    const oldData = {
      locationType: element.currentLocationType,
      locationId: element.currentLocationId,
    };

    element.currentLocationType = dto.toType;
    element.currentLocationId = dto.toId;

    await this.elementRepo.save(element);

    await this.logger.logEvent({
      table: 'element',
      recordId: element.id,
      action: 'move',
      actorId: dto.movedBy,
      actorType: dto.movedByType,
      oldData,
      newData: {
        locationType: element.currentLocationType,
        locationId: element.currentLocationId,
      },
    });

    return { moved: true };
  }
}
