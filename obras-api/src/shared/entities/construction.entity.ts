import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { Architect } from './architect.entity';

@Entity()
export class Construction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
  
  @ManyToOne(() => Architect)
  architect: Architect;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
