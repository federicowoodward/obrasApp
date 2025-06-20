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

@Module({
  imports: [
    ArchitectModule,
    PlanLimitModule,
    ConstructionModule,
    ConstructionWorkerModule,
    DepositModule,
    ElementModule,
    NoteModule,
    MissingModule,
    EventsHistoryModule,
    ElementMoveDetailModule,
    ConstructionSnapshotModule,
    ElementLocationModule,
    CategoryModule,
    AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
