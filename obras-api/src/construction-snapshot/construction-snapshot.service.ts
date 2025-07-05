// src/construction-snapshot/construction-snapshot.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConstructionSnapshot } from 'src/shared/entities/construction-snapshot.entity';
import { EventsHistory } from 'src/shared/entities/events-history.entity';
import { Construction } from 'src/shared/entities/construction.entity';
import { EventsHistoryLoggerService } from 'src/shared/services/events-history/events-history-logger.service';

@Injectable()
export class ConstructionSnapshotService {
  constructor(
    @InjectRepository(ConstructionSnapshot)
    private readonly snapshotRepo: Repository<ConstructionSnapshot>,

    @InjectRepository(Construction)
    private readonly constructionRepo: Repository<Construction>,

    private readonly logger: EventsHistoryLoggerService,
  ) {}

  async createSnapshot(event: EventsHistory, construction: Construction) {
    const snapshot = this.snapshotRepo.create({
      event,
      snapshotData: {
        title: construction.title,
        description: construction.description,
        createdAt: construction.createdAt,
      },
    });

    await this.snapshotRepo.save(snapshot);
  }

  async restoreSnapshot(eventId: number) {
    const snapshot = await this.snapshotRepo.findOne({
      where: {
        event: {
          id: eventId,
        },
      },
      relations: ['event'],
    });

    if (!snapshot) throw new NotFoundException('Snapshot no encontrada');

    const data = snapshot.snapshotData;

    const newConstruction = this.constructionRepo.create({
      title: data.title,
      description: data.description,
      architect: { id: snapshot.event.changedBy },
    });

    const saved = await this.constructionRepo.save(newConstruction);

    // 🧼 Borrar snapshot después del restore
    await this.snapshotRepo.delete(snapshot.id);

    await this.logger.logEvent({
      table: 'construction',
      recordId: saved.id,
      action: 'restore',
      actorId: snapshot.event.changedBy,
      actorType: 'architect',
      oldData: null,
      newData: data,
    });

    return saved;
  }
}
