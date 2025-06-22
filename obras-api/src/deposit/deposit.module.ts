// src/deposit/deposit.module.ts
import { Module } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposit } from 'src/shared/entities/deposit.entity';
import { Architect } from 'src/shared/entities/architect.entity';
import { EventsHistoryLoggerModule } from 'src/shared/services/events-history/events-history-logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Deposit, Architect]),
    EventsHistoryLoggerModule
  ],
  controllers: [DepositController],
  providers: [DepositService],
})
export class DepositModule {}