import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateMissingDto {
  @IsString()
  @IsOptional()
  @MaxLength(140)
  title?: string;

  @IsString()
  @IsOptional()
  text?: string;

  @IsBoolean()
  @IsOptional()
  urgent?: boolean;
}
