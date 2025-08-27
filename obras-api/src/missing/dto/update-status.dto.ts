import { IsEnum } from 'class-validator';
import { MissingStatus } from '../../shared/entities/missing.entity';

export class UpdateMissingStatusDto {
  @IsEnum(MissingStatus)
  status: MissingStatus; 
}