import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EventsHistory } from './events-history.entity';
import { Construction } from './construction.entity';

@Entity()
export class ConstructionSnapshot {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EventsHistory)
  @JoinColumn({ name: 'eventId' }) // ⬅️ 👈🏼 IMPORTANTE
  event: EventsHistory;

  @Column({ type: 'jsonb' })
  snapshotData: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
