// src/category/category.controller.ts
import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Category } from 'src/shared/entities/category.entity';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las categorías' })
  @ApiResponse({ status: 200, type: [Category] })
  findAll() {
    return this.categoryService.findAll();
  }
}
