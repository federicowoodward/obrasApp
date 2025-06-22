import { IsNotEmpty, IsString, IsNumber, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteNoteDto {
  @ApiProperty({ enum: ['architect', 'worker'] })
  @IsString()
  @IsIn(['architect', 'worker'])
  deleted_by_type: string;

  @ApiProperty()
  @IsNumber()
  deleted_by: number;
}
