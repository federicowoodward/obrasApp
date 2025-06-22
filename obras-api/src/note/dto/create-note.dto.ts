import { IsNotEmpty, IsString, IsNumber, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  @IsNumber()
  elementId: number;

  @ApiProperty({ enum: ['architect', 'worker'] })
  @IsString()
  @IsIn(['architect', 'worker'])
  created_by_type: string;

  @ApiProperty()
  @IsNumber()
  created_by: number;

  get element() {
    return { id: this.elementId };
  }
}
