// src/deposit/deposit.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deposit } from 'src/shared/entities/deposit.entity';
import { Architect } from 'src/shared/entities/architect.entity';
import { EventsHistoryLoggerService } from 'src/shared/services/events-history/events-history-logger.service';

@Injectable()
export class DepositService {
  constructor(
    @InjectRepository(Deposit)
    private readonly depositRepo: Repository<Deposit>,

    @InjectRepository(Architect)
    private readonly architectRepo: Repository<Architect>,

    private readonly logger: EventsHistoryLoggerService,
  ) {}

  async create(architectId: number, name: string) {
    const architect = await this.architectRepo.findOneBy({ id: architectId });
    if (!architect) throw new NotFoundException('Arquitecto no encontrado');

    const deposit = this.depositRepo.create({ name, architect });
    const saved = await this.depositRepo.save(deposit);

    await this.logger.logEvent({
      table: 'deposit',
      action: 'create',
      recordId: saved.id,
      actorId: architectId,
      actorType: 'architect',
      newData: saved,
    });

    return saved;
  }

  async findAllByArchitect(architectId: number) {
    return this.depositRepo.find({ where: { architect: { id: architectId } } });
  }

  async update(id: number, architectId: number, name: string) {
    const deposit = await this.depositRepo.findOne({
      where: { id, architect: { id: architectId } },
    });
    if (!deposit) throw new NotFoundException('Depósito no encontrado');

    const oldData = { ...deposit };
    deposit.name = name;
    const updated = await this.depositRepo.save(deposit);

    await this.logger.logEvent({
      table: 'deposit',
      action: 'update',
      recordId: updated.id,
      actorId: architectId,
      actorType: 'architect',
      oldData,
      newData: updated,
    });

    return updated;
  }

  async delete(id: number, architectId: number) {
    const deposit = await this.depositRepo.findOne({
      where: { id, architect: { id: architectId } },
    });
    if (!deposit) throw new NotFoundException('Depósito no encontrado');

    await this.logger.logEvent({
      table: 'deposit',
      action: 'delete',
      recordId: deposit.id,
      actorId: architectId,
      actorType: 'architect',
      oldData: deposit,
    });

    await this.depositRepo.remove(deposit);
    return { deleted: true };
  }
}
