import { Module } from '@nestjs/common';
import { ArchitectService } from './architect.service';
import { ArchitectController } from './architect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Architect } from 'src/shared/entities/architect.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Architect])],
  controllers: [ArchitectController],
  providers: [ArchitectService],
})
export class ArchitectModule {}
