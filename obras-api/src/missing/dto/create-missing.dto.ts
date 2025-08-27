import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateMissingDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(140)
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsBoolean()
  @IsOptional()
  urgent?: boolean = false;

  @IsInt()
  constructionId: number;

  @IsInt()
  architectId: number;
}
