import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsHistory } from 'src/shared/entities/events-history.entity';

interface LogEventOptions {
  table: string;
  recordId: number;
  action: 'create' | 'update' | 'delete' | 'move' | 'assign' | 'close';
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
        move: 'Elemento movido de depósito/obra',
      },
      worker: {
        create: 'Obrero agregado',
        update: 'Obrero actualizado',
        delete: 'Obrero borrado',
        assign: 'Obrero asignado',
      },
      construction: {
        create: 'Construccion agregada',
        update: 'Construccion actualizada',
        delete: 'Construccion borrada',
        assign: 'Construccion asignada',
      },
      // ...
    };

    //borrar en prod
    let t = map[table]?.[action] ?? 'Acción no definida';
    if (t === 'Acción no definida')
      console.log(
        '------- Acción no definida-------------',
        'table: ',
        table,
        '//',
        'action: ',
        action,
      );
    //

    return map[table]?.[action] ?? 'Acción no definida';
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
      table_name: table,
      record_id: recordId,
      action: action_message,
      old_data: oldData ? JSON.stringify(oldData) : null,
      new_data: newData ? JSON.stringify(newData) : null,
      changed_by: actorId,
      changed_by_type: actorType,
    });

    await this.historyRepo.save(event);
  }
}
