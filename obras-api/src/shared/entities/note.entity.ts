import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Element } from './element.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column()
  createdBy: number;

  @Column()
  createdByType: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => Element, (element) => element.note)
  element: Element;
}
