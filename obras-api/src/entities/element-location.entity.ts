import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Element } from './element.entity';

@Entity()
export class ElementLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Element)
  element: Element;

  @Column()
  location_type: string;

  @Column()
  location_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

}
