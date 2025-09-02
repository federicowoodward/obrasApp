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
import { LocationType } from '../enums/location-type.enum';

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

  @ManyToOne(() => Architect)
  architect: Architect;

  @OneToOne(() => Note, (note) => note.element, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'note_id' })
  note: Note | null;

  @Column({
    type: 'enum',
    enum: LocationType,
    nullable: true,
    name: 'current_location_type',
  })
  currentLocationType: LocationType | null;

  @Column({
    type: 'int',
    nullable: true,
    name: 'current_location_id',
  })
  currentLocationId: number | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
