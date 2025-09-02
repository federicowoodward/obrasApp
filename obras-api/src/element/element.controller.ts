// src/element/element.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ElementService } from './element.service';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { UpsertElementDto } from './dto/upsert-element.dto';

@ApiTags('Element')
@Controller('architect/:architectId/element')
export class ElementController {
  constructor(private readonly elementService: ElementService) {}

  @Post()
  @ApiOperation({ summary: 'Crear elemento' })
  @ApiParam({ name: 'architectId', type: Number })
  @ApiBody({ type: UpsertElementDto })
  create(
    @Param('architectId') architectId: number,
    @Body() dto: UpsertElementDto,
  ) {
    return this.elementService.create(+architectId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar elementos del arquitecto' })
  @ApiParam({ name: 'architectId', type: Number })
  findAll(@Param('architectId') architectId: number) {
    return this.elementService.findAll(+architectId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar elemento' })
  @ApiParam({ name: 'architectId', type: Number })
  @ApiParam({ name: 'id', type: Number })
  update(
    @Param('architectId') architectId: number,
    @Param('id') id: number,
    @Body() dto: UpsertElementDto,
  ) {
    return this.elementService.update(+architectId, +id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar elemento' })
  @ApiParam({ name: 'architectId', type: Number })
  @ApiParam({ name: 'id', type: Number })
  delete(@Param('architectId') architectId: number, @Param('id') id: number) {
    return this.elementService.delete(+architectId, +id);
  }
}
