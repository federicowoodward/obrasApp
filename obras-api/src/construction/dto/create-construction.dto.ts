// src/construction/dto/create-construction.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConstructionDto {
  @ApiProperty({ example: 'Obra Nueva - Barrio Norte' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Construcción de una vivienda de 3 pisos' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
