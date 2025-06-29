import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsHistory } from 'src/shared/entities/events-history.entity';

interface LogEventOptions {
  table: string;
  recordId: number;
  action:
    | 'create'
    | 'update'
    | 'delete'
    | 'move'
    | 'assign'
    | 'close'
    | 'restore';
  actorId: number;
  actorType: 'architect' | 'worker';
  oldData?: any;
  newData?: any;
}

@Injectable()
export class EventsHistoryLoggerService {
  constructor(
    @InjectRepository(EventsHistory)
    private readonly historyRepo: Repository<EventsHistory>,
  ) {}

  private getActionDescription(table: string, action: string): string {
    const map = {
      element: {
        create: 'Elemento creado',
        update: 'Elemento actualizado',
        delete: 'Elemento eliminado',
        move: 'Elemento movido de depósito/obra',
        assign: 'Elemento asignado',
      },
      construction_worker: {
        create: 'Obrero agregado',
        update: 'Obrero actualizado',
        delete: 'Obrero eliminado',
        assign: 'Obrero asignado a obra',
      },
      construction: {
        create: 'Construcción creada',
        update: 'Construcción actualizada',
        delete: 'Construcción eliminada',
        restore: 'Construcción recuperada',
      },
      deposit: {
        create: 'Depósito creado',
        update: 'Depósito actualizado',
        delete: 'Depósito eliminado',
      },
      note: {
        create: 'Nota agregada',
        update: 'Nota actualizada',
        delete: 'Nota eliminada',
      },
      category: {
        create: 'Categoría creada',
        update: 'Categoría actualizada',
        delete: 'Categoría eliminada',
      },
      architect: {
        create: 'Cuenta de arquitecto creada',
        login: 'Inicio de sesión',
      },
    };

    const description = map[table]?.[action] ?? 'Acción no definida';

    if (
      description === 'Acción no definida' &&
      process.env.NODE_ENV === 'development'
    ) {
      console.log(
        '⚠️ Acción no definida',
        '→ table:',
        table,
        '| action:',
        action,
      );
    }

    return description;
  }

  async logEvent({
    table,
    recordId,
    action,
    actorId,
    actorType,
    oldData = null,
    newData = null,
  }: LogEventOptions) {
    let action_message = this.getActionDescription(table, action);

    const event = this.historyRepo.create({
      tableName: table,
      recordId: recordId,
      action: action_message,
      oldData: oldData ? JSON.stringify(oldData) : null,
      newData: newData ? JSON.stringify(newData) : null,
      changedBy: actorId,
      changedByType: actorType,
    });

    return await this.historyRepo.save(event);
  }
}
