import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Category } from './category.entity';
import { Architect } from './architect.entity';
import { Note } from './note.entity';

@Entity()
export class Element {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  provider: string;

  @Column({ type: 'date' })
  buy_date: string;

  @ManyToOne(() => Category)
  category: Category;

  @ManyToOne(() => Architect)
  architect: Architect;

  @OneToOne(() => Note)
  note: Note;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}