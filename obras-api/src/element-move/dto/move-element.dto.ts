// src/element-move/dto/move-element.dto.ts
import { IsEnum, IsInt } from 'class-validator';
import { LocationType } from 'src/shared/entities/element-move-detail.entity';
import { ApiProperty } from '@nestjs/swagger';

export class MoveElementDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  elementId: number;

  @ApiProperty({ enum: LocationType, example: LocationType.DEPOSIT })
  @IsEnum(LocationType)
  fromType: LocationType;

  @ApiProperty({ example: 1 })
  @IsInt()
  fromId: number;

  @ApiProperty({ enum: LocationType, example: LocationType.CONSTRUCTION })
  @IsEnum(LocationType)
  toType: LocationType;

  @ApiProperty({ example: 2 })
  @IsInt()
  toId: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  movedBy: number;

  @ApiProperty({ example: 'architect' })
  movedByType: 'architect' | 'worker';
}
