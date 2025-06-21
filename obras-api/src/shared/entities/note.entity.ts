import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Element } from './element.entity';
import { Architect } from './architect.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne(() => Element)
  element: Element;

  @ManyToOne(() => Architect)
  architect: Architect;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

}