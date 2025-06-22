// src/deposit/dto/create-deposit.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepositDto {
  @ApiProperty({ example: 'Depósito Central' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
