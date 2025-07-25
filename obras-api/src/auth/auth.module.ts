import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Architect } from 'src/shared/entities/architect.entity';
import { ConstructionWorker } from 'src/shared/entities/construction-worker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Architect, ConstructionWorker])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
