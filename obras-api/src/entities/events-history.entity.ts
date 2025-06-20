import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Architect } from './architect.entity';
import { ConstructionWorker } from './construction-worker.entity';

@Entity()
export class EventsHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  table_name: string;

  @Column()
  record_id: number;

  @Column()
  action: string;

  @Column({ type: 'jsonb', nullable: true })
  old_data: any;

  @Column({ type: 'jsonb', nullable: true })
  new_data: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  changed_at: Date;

  @Column()
  changed_by: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

}
