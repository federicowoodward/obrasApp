import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Architect } from './architect.entity';

@Entity()
export class PlanLimit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  maxElements: number;

  @Column()
  maxDeposits: number;

  @Column()
  maxConstructions: number;

  @Column()
  maxWorkers: number;

  @OneToMany(() => Architect, (architect) => architect.paymentLevel)
  architects: Architect[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
