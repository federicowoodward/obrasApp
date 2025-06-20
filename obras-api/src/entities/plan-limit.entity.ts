import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Architect } from './architect.entity';

@Entity()
export class PlanLimit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  max_elements: number;

  @Column()
  max_deposits: number;

  @Column()
  max_constructions: number;

  @Column()
  max_workers: number;

  @OneToMany(() => Architect, (architect) => architect.payment_level)
  architects: Architect[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
