import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Architect } from './architect.entity';
import { ConstructionWorker } from './construction-worker.entity';

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
  
  @OneToMany(() => ConstructionWorker, worker => worker.construction)
  constructionWorkers: ConstructionWorker[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
