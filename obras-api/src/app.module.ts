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
import { ElementMoveDetailModule } from './element-move-detail/element-move-detail.module';
import { ConstructionSnapshotModule } from './construction-snapshot/construction-snapshot.module';
import { ElementLocationModule } from './element-location/element-location.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ElementMoveModule } from './element-move/element-move.module';

@Module({
  imports: [
    ArchitectModule,
    AuthModule,
    PlanLimitModule,
    ConstructionModule,
    ConstructionWorkerModule,
    DepositModule,
    ElementModule,
    NoteModule,
    MissingModule,
    EventsHistoryModule,
    ConstructionSnapshotModule,
    ElementMoveDetailModule,
    ElementLocationModule,
    ElementMoveModule,
    CategoryModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // 🔥 lee .env.dev si NODE_ENV=development
      isGlobal: true,
    }),
    ElementMoveModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
