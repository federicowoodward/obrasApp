import { LocationType } from '../../shared/enums/location-type.enum';

export class MoveElementDto {
  elementId: number;
  toType: LocationType;
  toId: number;
  movedBy: number;
  movedByType: 'architect' | 'worker' | 'admin';
}
