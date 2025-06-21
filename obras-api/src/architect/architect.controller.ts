import { Controller, Post, Body } from '@nestjs/common';
import { ArchitectService } from './architect.service';
import { CreateArchitectDto } from './dto/create-architect.dto';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('Architect')
@Controller('architect')
export class ArchitectController {
  constructor(private readonly architectService: ArchitectService) {}

  @Post('up')
  @ApiCreatedResponse({ description: 'Arquitecto creado con éxito' })
  create(@Body() dto: CreateArchitectDto) {
    return this.architectService.create(dto);
  }
}
