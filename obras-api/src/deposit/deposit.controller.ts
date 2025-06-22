// src/deposit/deposit.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DepositService } from './deposit.service';
import { ApiTags, ApiParam, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateDepositDto } from './dto/create-deposit.dto';

@ApiTags('Deposit')
@Controller('architect/:architectId/deposit')
export class DepositController {
  constructor(private readonly service: DepositService) {}

  @Post()
  @ApiOperation({ summary: 'Crear depósito' })
  @ApiParam({ name: 'architectId', type: Number })
  @ApiBody({ type: CreateDepositDto }) // Esto es clave para Swagger
  create(
    @Param('architectId') architectId: number,
    @Body() dto: CreateDepositDto,
  ) {
    return this.service.create(+architectId, dto.name);
  }

  @Get()
  @ApiOperation({ summary: 'Listar depósitos del arquitecto' })
  findAll(@Param('architectId') architectId: number) {
    return this.service.findAllByArchitect(+architectId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar nombre del depósito' })
  update(
    @Param('architectId') architectId: number,
    @Param('id') id: number,
    @Body('name') name: string,
  ) {
    return this.service.update(+id, +architectId, name);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar depósito' })
  delete(@Param('architectId') architectId: number, @Param('id') id: number) {
    return this.service.delete(+id, +architectId);
  }
}
