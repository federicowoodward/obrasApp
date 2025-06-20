import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ConstructionWorker } from './construction-worker.entity';
import { Construction } from './construction.entity';
import { Architect } from './architect.entity';

@Entity()
export class Missing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne(() => ConstructionWorker)
  construction_worker: ConstructionWorker;

  @ManyToOne(() => Construction)
  construction: Construction;

  @ManyToOne(() => Architect)
  architect: Architect;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

}