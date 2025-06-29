import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Element } from './element.entity';

@Entity()
export class ElementLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Element)
  element: Element;

  @Column()
  locationType: string;

  @Column()
  locationId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

}
