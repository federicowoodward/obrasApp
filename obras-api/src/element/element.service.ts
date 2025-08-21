// src/element/element.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Element } from 'src/shared/entities/element.entity';
import { CreateElementDto } from './dto/create-element.dto';
import { Architect } from 'src/shared/entities/architect.entity';
import { Category } from 'src/shared/entities/category.entity';
import { EventsHistoryLoggerService } from 'src/shared/services/events-history/events-history-logger.service';
import { ElementLocationService } from 'src/element-location/element-location.service';
import { ElementLocation } from 'src/shared/entities/element-location.entity';

@Injectable()
export class ElementService {
  constructor(
    @InjectRepository(Element)
    private readonly elementRepo: Repository<Element>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    @InjectRepository(Architect)
    private readonly architectRepo: Repository<Architect>,

    private readonly logger: EventsHistoryLoggerService,
    private readonly locationService: ElementLocationService,
  ) {}

  async create(architectId: number, dto: CreateElementDto) {
    const architect = await this.architectRepo.findOne({
      where: { id: architectId },
    });
    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });

    if (!architect) throw new NotFoundException('Arquitecto no encontrado');
    if (!category) throw new NotFoundException('Categoría no encontrada');

    const element = this.elementRepo.create({
      ...dto,
      category,
      architect,
    });

    const saved = await this.elementRepo.save(element);

    await this.locationService.updateLocation(saved.id, {
      locationType: 'deposit',
      locationId: dto.locationId,
    });

    await this.logger.logEvent({
      table: 'element',
      recordId: saved.id,
      action: 'create',
      actorId: architectId,
      actorType: 'architect',
      newData: saved,
    });

    return saved;
  }

  async findAll(architectId: number) {
    return this.elementRepo.find({
      where: { architect: { id: architectId } },
      relations: ['category', 'location', 'note'],
    });
  }

  async update(architectId: number, id: number, dto: CreateElementDto) {
    const existing = await this.elementRepo.findOne({
      where: { id, architect: { id: architectId } },
      relations: ['category'],
    });
    if (!existing) throw new NotFoundException('Elemento no encontrado');

    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });
    if (!category) throw new NotFoundException('Categoría no encontrada');

    await this.locationService.updateLocation(id, {
      locationType: dto.locationType,
      locationId: dto.locationId,
    });

    const oldData = { ...existing };

    existing.name = dto.name;
    existing.brand = dto.brand;
    existing.provider = dto.provider;
    existing.buyDate = dto.buyDate;
    existing.category = category;

    const updated = await this.elementRepo.save(existing);

    await this.logger.logEvent({
      table: 'element',
      recordId: updated.id,
      action: 'update',
      actorId: architectId,
      actorType: 'architect',
      oldData,
      newData: updated,
    });

    return updated;
  }

  async delete(architectId: number, id: number) {
    const found = await this.elementRepo.findOne({
      where: { id, architect: { id: architectId } },
    });
    if (!found) throw new NotFoundException('Elemento no encontrado');

    await this.elementRepo.remove(found);

    await this.logger.logEvent({
      table: 'element',
      recordId: id,
      action: 'delete',
      actorId: architectId,
      actorType: 'architect',
      oldData: found,
    });

    return { deleted: true };
  }
}
