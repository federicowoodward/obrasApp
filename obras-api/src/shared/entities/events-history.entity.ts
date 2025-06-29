import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Architect } from './architect.entity';
import { ConstructionWorker } from './construction-worker.entity';

@Entity()
export class EventsHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tableName: string;

  @Column()
  recordId: number;

  @Column()
  action: string;

  @Column({ type: 'jsonb', nullable: true })
  oldData: any;

  @Column({ type: 'jsonb', nullable: true })
  newData: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  changedAt: Date;

  @Column()
  changedBy: number;

  @Column()
  changedByType: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
