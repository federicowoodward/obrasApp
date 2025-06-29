// src/element-location/element-location.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElementLocation } from 'src/shared/entities/element-location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ElementLocationService {
  constructor(
    @InjectRepository(ElementLocation)
    private readonly repo: Repository<ElementLocation>,
  ) {}

  async updateLocation(
    elementId: number,
    data: { locationType: string; locationId: number },
  ) {
    const current = await this.repo.findOne({
      where: { element: { id: elementId } },
    });

    if (current) {
      current.locationType = data.locationType;
      current.locationId = data.locationId;
      current.updatedAt = new Date();
      return this.repo.save(current);
    }

    return this.repo.save(
      this.repo.create({
        element: { id: elementId },
        locationType: data.locationType,
        locationId: data.locationId,
      }),
    );
  }
}
