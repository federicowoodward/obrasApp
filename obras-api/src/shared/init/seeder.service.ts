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
    await this.resetTables();
    await this.seedPlanLimits();
    await this.seedCategories();
  }

  private async seedPlanLimits() {
    const count = await this.planLimitRepo.count();
    if (count > 0) return;

    await this.planLimitRepo.save([
      {
        name: 'Free',
        maxElements: 10,
        maxDeposits: 1,
        maxConstructions: 1,
        maxWorkers: 2,
      },
      {
        name: 'Starter',
        maxElements: 50,
        maxDeposits: 3,
        maxConstructions: 2,
        maxWorkers: 10,
      },
      {
        name: 'Pro',
        maxElements: 200,
        maxDeposits: 10,
        maxConstructions: 10,
        maxWorkers: 50,
      },
      {
        name: 'Enterprise',
        maxElements: 1000,
        maxDeposits: 50,
        maxConstructions: 50,
        maxWorkers: 500,
      },
    ]);
  }

  private async seedCategories() {
    const count = await this.categoryRepo.count();
    if (count > 0) return;

    await this.categoryRepo.save([
      { name: 'Material' },
      { name: 'Herramienta' },
      { name: 'Elemento de seguridad' },
    ]);
  }

  private async resetTables() {
    await this.planLimitRepo.query(`TRUNCATE TABLE "plan_limit" RESTART IDENTITY CASCADE`);
    await this.categoryRepo.query(`TRUNCATE TABLE "category" RESTART IDENTITY CASCADE`);
  }
}
