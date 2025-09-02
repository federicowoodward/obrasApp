import { Module } from '@nestjs/common';
import { ArchitectModule } from './architect/architect.module';
import { PlanLimitModule } from './plan-limit/plan-limit.module';
import { ConstructionModule } from './construction/construction.module';
import { ConstructionWorkerModule } from './construction-worker/construction-worker.module';
import { DepositModule } from './deposit/deposit.module';
import { ElementModule } from './element/element.module';
import { NoteModule } from './note/note.module';
import { MissingModule } from './missing/missing.module';
import { EventsHistoryModule } from './events-history/events-history.module';
import { ConstructionSnapshotModule } from './construction-snapshot/construction-snapshot.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ElementMoveModule } from './element-move/element-move.module';
import { SeederModule } from './shared/init/seeder.module';
import { DbReadyLoggerService } from './shared/services/db-ready-logger/db-ready-logger.service';
import { DevSeederModule } from './shared/init/dev-seeder.module';
import { StadisticsModule } from './stadistics/stadistics/stadistics.module';

@Module({
  imports: [
    ArchitectModule,
    AuthModule,
    PlanLimitModule,
    ConstructionModule,
    ConstructionWorkerModule,
    DepositModule,
    ElementModule,
    ElementMoveModule,
    NoteModule,
    MissingModule,
    EventsHistoryModule,
    ConstructionSnapshotModule,
    ElementMoveModule,
    CategoryModule,
    // SeederModule,
    DevSeederModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    StadisticsModule,
  ],
  controllers: [],
  providers: [DbReadyLoggerService],
})
export class AppModule {}
