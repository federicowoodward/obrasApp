import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EventsHistory } from './events-history.entity';
import { Element } from './element.entity';

export enum LocationType {
  CONSTRUCTION = 'construction',
  DEPOSIT = 'deposit',
}

@Entity()
export class ElementMoveDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EventsHistory)
  event: EventsHistory;

  @ManyToOne(() => Element)
  element: Element;

  @Column({ type: 'enum', enum: LocationType })
  fromLocationType: LocationType;

  @Column()
  fromLocationId: number;

  @Column({ type: 'enum', enum: LocationType })
  toLocationType: LocationType;

  @Column()
  toLocationId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
