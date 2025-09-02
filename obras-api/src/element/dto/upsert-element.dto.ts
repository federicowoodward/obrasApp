import { LocationType } from '../../shared/enums/location-type.enum';

export class UpsertElementDto {
  name: string;
  brand: string;
  provider: string;
  buyDate: string;      
  categoryId: number;

  // Opcionalmente setear ubicación al crear/editar
  currentLocationType?: LocationType | null;
  currentLocationId?: number | null;
}
