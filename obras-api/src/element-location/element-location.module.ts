import { Module } from '@nestjs/common';
import { ElementLocationService } from './element-location.service';
import { ElementLocationController } from './element-location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElementLocation } from 'src/shared/entities/element-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ElementLocation])],
  controllers: [ElementLocationController],
  providers: [ElementLocationService],
  exports: [ElementLocationService],
})
export class ElementLocationModule {}
