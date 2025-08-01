// src/element/dto/create-element.dto.ts
import { IsNotEmpty, IsString, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateElementDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  provider: string;

  @ApiProperty({ example: '2025-06-21' })
  @IsDateString()
  buyDate: string;

  @ApiProperty()
  @IsNumber()
  categoryId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  locationId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  locationType: string;
}
