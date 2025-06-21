import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Architect } from './architect.entity';
import { Category } from './category.entity';
import { Construction } from './construction.entity';

@Entity()
export class ConstructionWorker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @ManyToOne(() => Architect)
  architect: Architect;

  @ManyToOne(
    () => Construction,
    (construction) => construction.construction_workers,
  )
  @JoinColumn({ name: 'construction_id' })
  construction: Construction;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
