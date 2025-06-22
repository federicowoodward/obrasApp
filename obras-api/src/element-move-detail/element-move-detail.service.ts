// src/element-move-detail/element-move-detail.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ElementMoveDetail,
  LocationType,
} from 'src/shared/entities/element-move-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ElementMoveDetailService {
  constructor(
    @InjectRepository(ElementMoveDetail)
    private readonly repo: Repository<ElementMoveDetail>,
  ) {}

  async saveMove(data: {
    eventId: number;
    elementId: number;
    fromType: LocationType;
    fromId: number;
    toType: LocationType;
    toId: number;
  }) {
    const record = this.repo.create({
      event: { id: data.eventId },
      element: { id: data.elementId },
      from_location_type: data.fromType,
      from_location_id: data.fromId,
      to_location_type: data.toType,
      to_location_id: data.toId,
    });

    return this.repo.save(record);
  }
}
