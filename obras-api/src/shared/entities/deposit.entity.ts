import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Architect } from './architect.entity';

@Entity()
export class Deposit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Architect)
  architect: Architect;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

}