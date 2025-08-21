import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { DeleteNoteDto } from './dto/delete-note.dto';

@ApiTags('Notas')
@Controller('note')
export class NoteController {
  constructor(private readonly service: NoteService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nota' })
  create(@Body() dto: CreateNoteDto) {
    return this.service.create(dto);
  }

  @Get('element/:elementId')
  @ApiOperation({ summary: 'Obtener notas por elemento' })
  @ApiParam({ name: 'elementId', type: Number })
  getByElement(@Param('elementId', ParseIntPipe) elementId: number) {
    return this.service.findByElement(elementId);
  }

  @Get('architect/:architectId')
  @ApiOperation({ summary: 'Obtener todas las notas de un arquitecto' })
  @ApiParam({ name: 'architectId', type: Number })
  getByArchitect(@Param('architectId', ParseIntPipe) architectId: number) {
    return this.service.findByArchitect(architectId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar nota' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateNoteDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar nota' })
  @ApiParam({ name: 'id', type: Number })
  delete(@Param('id', ParseIntPipe) id: number, @Body() dto: DeleteNoteDto) {
    return this.service.delete(id, dto);
  }
}
