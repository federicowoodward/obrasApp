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

  async updateLocation(elementId: number, data: { location_type: string; location_id: number }) {
    const current = await this.repo.findOne({ where: { element: { id: elementId } } });

    if (current) {
      current.location_type = data.location_type;
      current.location_id = data.location_id;
      current.updated_at = new Date();
      return this.repo.save(current);
    }

    return this.repo.save(
      this.repo.create({
        element: { id: elementId },
        location_type: data.location_type,
        location_id: data.location_id,
      }),
    );
  }
}
