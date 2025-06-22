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
  @JoinColumn({ name: 'event_id' }) // ⬅️ 👈🏼 IMPORTANTE
  event: EventsHistory;

  @Column({ type: 'jsonb' })
  snapshot_data: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
