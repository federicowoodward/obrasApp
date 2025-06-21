// src/construction-worker/construction-worker.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ConstructionWorkerService } from './construction-worker.service';
import { CreateConstructionWorkerDto } from './dto/create-construction-worker.dto';
import { UpdateConstructionWorkerDto } from './dto/update-construction-worker.dto';
import { ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('Construction Worker')
@Controller('architect/:architectId/construction-worker')
export class ConstructionWorkerController {
  constructor(private readonly service: ConstructionWorkerService) {}

  @Post()
  @ApiParam({ name: 'architectId', type: Number })
  create(
    @Param('architectId', ParseIntPipe) architectId: number,
    @Body() dto: CreateConstructionWorkerDto,
  ) {
    return this.service.create(architectId, dto);
  }

  @Get()
  @ApiParam({ name: 'architectId', type: Number })
  findAll(@Param('architectId', ParseIntPipe) architectId: number) {
    return this.service.findAll(architectId);
  }

  @Get(':id')
  @ApiParam({ name: 'architectId', type: Number })
  findOne(
    @Param('architectId', ParseIntPipe) architectId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.findOne(architectId, id);
  }

  @Put(':id')
  @ApiParam({ name: 'architectId', type: Number })
  update(
    @Param('architectId', ParseIntPipe) architectId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateConstructionWorkerDto,
  ) {
    return this.service.update(architectId, id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'architectId', type: Number })
  remove(
    @Param('architectId', ParseIntPipe) architectId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.remove(architectId, id);
  }
}
