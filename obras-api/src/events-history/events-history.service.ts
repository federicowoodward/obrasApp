import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsHistory } from 'src/shared/entities/events-history.entity';
import { Architect } from 'src/shared/entities/architect.entity';
import { ConstructionWorker } from 'src/shared/entities/construction-worker.entity';

type EventsHistoryWithUser = EventsHistory & {
  architectData?: Architect | null;
  workerData?: ConstructionWorker | null;
  changedByUser?: Architect | ConstructionWorker | null;
};

@Injectable()
export class EventsHistoryService {
  constructor(
    @InjectRepository(EventsHistory)
    private readonly eventsHistoryRepo: Repository<EventsHistory>,
  ) {}

  async findAll(): Promise<EventsHistoryWithUser[]> {
    const data = await this.eventsHistoryRepo
      .createQueryBuilder('event')
      .leftJoinAndMapOne(
        'event.architectData',
        Architect,
        'arch',
        `event.changedByType = 'architect' AND event.changedBy = arch.id`,
      )
      .leftJoinAndMapOne(
        'event.workerData',
        ConstructionWorker,
        'worker',
        `event.changedByType = 'worker' AND event.changedBy = worker.id`,
      )
      .orderBy('event.createdAt', 'DESC')
      .getMany();

    const result = (data as EventsHistoryWithUser[]).map((ev) => ({
      ...ev,
      changedByUser: ev.architectData ?? ev.workerData,
      architectData: undefined,
      workerData: undefined,
    }));

    return result;
  }
}
