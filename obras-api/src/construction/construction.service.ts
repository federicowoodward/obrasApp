// src/construction/construction.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Construction } from 'src/shared/entities/construction.entity';
import { Repository } from 'typeorm';
import { CreateConstructionDto } from './dto/create-construction.dto';
import { Architect } from 'src/shared/entities/architect.entity';
import { EventsHistoryLoggerService } from 'src/shared/services/events-history/events-history-logger.service';
import { ConstructionSnapshotService } from 'src/construction-snapshot/construction-snapshot.service';

@Injectable()
export class ConstructionService {
  constructor(
    @InjectRepository(Construction)
    private readonly constructionRepo: Repository<Construction>,

    @InjectRepository(Architect)
    private readonly architectRepo: Repository<Architect>,

    private readonly logger: EventsHistoryLoggerService,
    private readonly snapshotService: ConstructionSnapshotService,
  ) {}

  async create(architectId: number, dto: CreateConstructionDto) {
    const architect = await this.architectRepo.findOne({
      where: { id: architectId },
    });
    if (!architect) throw new NotFoundException('Arquitecto no encontrado');

    const construction = this.constructionRepo.create({
      title: dto.title,
      description: dto.description,
      architect,
    });

    const saved = await this.constructionRepo.save(construction);

    await this.logger.logEvent({
      table: 'construction',
      recordId: saved.id,
      action: 'create',
      actorId: architectId,
      actorType: 'architect',
      newData: saved,
    });

    return saved;
  }

  async findAllByArchitect(architectId: number) {
    return this.constructionRepo.find({
      where: { architect: { id: architectId } },
    });
  }

  async delete(id: number, architectId: number) {
    const found = await this.constructionRepo.findOne({
      where: { id, architect: { id: architectId } },
    });

    if (!found) {
      throw new NotFoundException(
        'Construcción no encontrada o no pertenece a este arquitecto',
      );
    }

    // Borrado lógico de construcción
    await this.constructionRepo.remove(found);

    // Logger
    const event = await this.logger.logEvent({
      table: 'construction',
      recordId: id,
      action: 'delete',
      actorId: architectId,
      actorType: 'architect',
      oldData: found,
    });

    // 📸 Snapshot automática
    await this.snapshotService.createSnapshot(event, found);

    return { deleted: true };
  }

  async update(id: number, architectId: number, dto: CreateConstructionDto) {
    const construction = await this.constructionRepo.findOne({
      where: { id, architect: { id: architectId } },
    });
    if (!construction)
      throw new NotFoundException('Construcción no encontrada');

    const oldData = { ...construction };

    construction.title = dto.title;
    construction.description = dto.description;

    const updated = await this.constructionRepo.save(construction);

    await this.logger.logEvent({
      table: 'construction',
      recordId: updated.id,
      action: 'update',
      actorId: architectId,
      actorType: 'architect',
      oldData,
      newData: updated,
    });

    return updated;
  }
}
