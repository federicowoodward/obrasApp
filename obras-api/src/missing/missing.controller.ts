// src/modules/missing/missing.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { MissingService } from './missing.service';
import { CreateMissingDto } from './dto/create-missing.dto';
import { UpdateMissingDto } from './dto/update-missing.dto';
import { UpdateMissingStatusDto } from './dto/update-status.dto';
import { QueryMissingDto } from './dto/query-missing.dto';

@Controller('missings')
export class MissingController {
  constructor(private readonly service: MissingService) {}

  @Get()
  findAll(@Query() q: QueryMissingDto) {
    return this.service.findAll(q);
  }

  @Get(':idMissing')
  findOne(@Param('idMissing', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateMissingDto, @Req() req: any) {
    return this.service.create(dto, req.user);
  }

  @Patch(':id')
  updateByWorker(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMissingDto,
    @Req() req: any,
  ) {
    return this.service.updateByWorker(id, dto, req.user);
  }

  @Delete(':id')
  removeByWorker(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.service.removeByWorker(id, req.user);
  }

  @Patch(':id/status')
  updateStatusAsArchitect(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMissingStatusDto,
    @Req() req: any,
  ) {
    return this.service.updateStatusAsArchitect(id, dto, req.user);
  }
}
