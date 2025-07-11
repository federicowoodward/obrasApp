import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Element } from './element.entity';

@Entity()
export class ElementLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Element, (element) => element.location)
  @JoinColumn()
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
