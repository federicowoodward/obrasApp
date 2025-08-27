// src/entities/missing.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ConstructionWorker } from './construction-worker.entity';
import { Construction } from './construction.entity';
import { Architect } from './architect.entity';

export enum MissingStatus {
  PENDING = 'pending', // "en espera"
  DONE = 'done', // "listo"
  CANCELLED = 'cancelled', // "cancelado"
}

@Entity()
@Index(['architect', 'status', 'urgent', 'createdAt'])
@Index(['construction', 'status'])
export class Missing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 140 })
  title: string;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'enum', enum: MissingStatus, default: MissingStatus.PENDING })
  status: MissingStatus;

  @Column({ type: 'boolean', default: false })
  urgent: boolean;

  @ManyToOne(() => ConstructionWorker, { nullable: false, eager: true })
  constructionWorker: ConstructionWorker;

  @ManyToOne(() => Construction, { nullable: false, eager: true })
  construction: Construction;

  @ManyToOne(() => Architect, { nullable: false, eager: true })
  architect: Architect;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
