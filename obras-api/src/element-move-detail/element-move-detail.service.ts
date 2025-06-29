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
      fromLocationType: data.fromType,
      fromLocationId: data.fromId,
      toLocationType: data.toType,
      toLocationId: data.toId,
    });

    return this.repo.save(record);
  }
}
