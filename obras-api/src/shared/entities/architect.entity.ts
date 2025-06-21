import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { PlanLimit } from './plan-limit.entity';
import { ConstructionWorker } from './construction-worker.entity';
import { Construction } from './construction.entity';
import { Element } from './element.entity';
import { Note } from './note.entity';
import { Missing } from './missing.entity';
import { Deposit } from './deposit.entity';

@Entity()
export class Architect {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => PlanLimit, (plan) => plan.architects)
  payment_level: PlanLimit;

  @OneToMany(() => ConstructionWorker, (cw) => cw.architect)
  construction_workers: ConstructionWorker[];

  @OneToMany(() => Construction, (c) => c.architect)
  constructions: Construction[];

  @OneToMany(() => Element, (e) => e.architect)
  elements: Element[];

  @OneToMany(() => Note, (n) => n.architect)
  notes: Note[];

  @OneToMany(() => Missing, (m) => m.architect)
  missings: Missing[];

  @OneToMany(() => Deposit, (d) => d.architect)
  deposits: Deposit[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
