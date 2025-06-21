// src/construction/construction.controller.ts
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import { ConstructionService } from './construction.service';
import { CreateConstructionDto } from './dto/create-construction.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { Construction } from 'src/shared/entities/construction.entity';

@ApiTags('Construcciones')
@Controller('architect/:architectId/construction')
export class ConstructionController {
  constructor(private readonly service: ConstructionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva construcción' })
  @ApiParam({ name: 'architectId', type: Number, required: true })
  @ApiBody({ type: CreateConstructionDto })
  @ApiResponse({ status: 201, type: Construction })
  create(
    @Param('architectId') architectId: number,
    @Body() dto: CreateConstructionDto,
  ) {
    return this.service.create(+architectId, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las construcciones de un arquitecto',
  })
  @ApiParam({ name: 'architectId', type: Number, required: true })
  @ApiResponse({ status: 200, type: [Construction] })
  findAll(@Param('architectId') architectId: number) {
    return this.service.findAllByArchitect(+architectId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una construcción' })
  @ApiParam({ name: 'architectId', type: Number })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateConstructionDto })
  @ApiResponse({ status: 200, type: Construction })
  update(
    @Param('architectId') architectId: number,
    @Param('id') id: number,
    @Body() dto: CreateConstructionDto,
  ) {
    return this.service.update(+id, +architectId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una construcción por ID' })
  @ApiParam({ name: 'architectId', type: Number })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Construcción eliminada' })
  remove(@Param('architectId') architectId: number, @Param('id') id: number) {
    return this.service.delete(+id, +architectId);
  }
}
