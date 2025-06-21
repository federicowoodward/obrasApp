import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EventsHistory } from './events-history.entity';
import { Construction } from './construction.entity';

@Entity()
export class ConstructionSnapshot {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EventsHistory)
  event: EventsHistory;

  @ManyToOne(() => Construction)
  construction: Construction;

  @Column({ type: 'jsonb' })
  snapshot_data: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}