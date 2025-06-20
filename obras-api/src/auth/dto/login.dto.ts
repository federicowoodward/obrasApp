// src/auth/dto/login.dto.ts

import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'juan.arquitecto@gmail.com', description: 'Email del arquitecto o nombre del trabajador' })
  @IsString()
  emailOrName: string;

  @ApiProperty({ example: 'supersegura123', description: 'Contraseña del usuario' })
  @IsString()
  password: string;
}
