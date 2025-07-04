import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanLimit } from '../entities/plan-limit.entity';
import { Category } from '../entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlanLimit, Category])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
