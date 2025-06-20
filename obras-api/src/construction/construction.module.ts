import { Module } from '@nestjs/common';
import { ConstructionService } from './construction.service';
import { ConstructionController } from './construction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Construction } from 'src/shared/entities/construction.entity';
import { Architect } from 'src/shared/entities/architect.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Construction, Architect])],
  controllers: [ConstructionController],
  providers: [ConstructionService],
})
export class ConstructionModule {}
