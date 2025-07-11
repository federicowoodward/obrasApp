// src/element-move/element-move.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ElementMoveService } from './element-move.service';
import { MoveElementDto } from './dto/move-element.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Element Move')
@Controller('element-move')
export class ElementMoveController {
  constructor(private readonly service: ElementMoveService) {}

  @Post()
  @ApiOperation({ summary: 'Mover un elemento a obra o depósito' })
  @ApiBody({ type: MoveElementDto })
  move(@Body() dto: MoveElementDto) {
    return this.service.move(dto);
  }
}
