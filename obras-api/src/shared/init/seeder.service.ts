import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanLimit } from '../entities/plan-limit.entity';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(PlanLimit)
    private readonly planLimitRepo: Repository<PlanLimit>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async onApplicationBootstrap() {
    if (process.env.NODE_ENV === 'dev') {
      // Opción para limpiar todo en entorno local si querés
      // await this.resetTables();
    }

    await this.seedPlanLimits();
    await this.seedCategories();
  }

  private async seedPlanLimits() {
    await this.planLimitRepo.save([
      {
        id: 1,
        name: 'Free',
        maxElements: 10,
        maxDeposits: 1,
        maxConstructions: 1,
        maxWorkers: 2,
      },
      {
        id: 2,
        name: 'Starter',
        maxElements: 50,
        maxDeposits: 3,
        maxConstructions: 2,
        maxWorkers: 10,
      },
      {
        id: 3,
        name: 'Pro',
        maxElements: 200,
        maxDeposits: 10,
        maxConstructions: 10,
        maxWorkers: 50,
      },
      {
        id: 4,
        name: 'Enterprise',
        maxElements: 1000,
        maxDeposits: 50,
        maxConstructions: 50,
        maxWorkers: 500,
      },
    ]);
  }

  private async seedCategories() {
    await this.categoryRepo.save([
      { id: 1, name: 'Material' },
      { id: 2, name: 'Herramienta' },
      { id: 3, name: 'Elemento de seguridad' },
    ]);
  }

  // ⚠️ OPCIONAL: solo para reinicio total en dev
  private async resetTables() {
    await this.planLimitRepo.query(
      `TRUNCATE TABLE "plan_limit" RESTART IDENTITY CASCADE`,
    );
    await this.categoryRepo.query(
      `TRUNCATE TABLE "category" RESTART IDENTITY CASCADE`,
    );
  }
}
