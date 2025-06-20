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
  from_location_type: LocationType;

  @Column()
  from_location_id: number;

  @Column({ type: 'enum', enum: LocationType })
  to_location_type: LocationType;

  @Column()
  to_location_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
