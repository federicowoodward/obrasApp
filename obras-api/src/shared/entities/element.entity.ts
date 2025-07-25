import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Architect } from './architect.entity';
import { Note } from './note.entity';
import { ElementLocation } from './element-location.entity';

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
  buyDate: string;

  @ManyToOne(() => Category)
  category: Category;

  @OneToOne(() => ElementLocation, (location) => location.element)
  location: ElementLocation;

  @ManyToOne(() => Architect)
  architect: Architect;

  @OneToOne(() => Note, { cascade: true })
  @JoinColumn()
  note: Note; // <- la clave foránea

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
