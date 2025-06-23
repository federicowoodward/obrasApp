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
    await this.seedPlanLimits();
    await this.seedCategories();
  }

  private async seedPlanLimits() {
    const count = await this.planLimitRepo.count();
    if (count > 0) return;

    await this.planLimitRepo.save([
      {
        name: 'Free',
        max_elements: 10,
        max_deposits: 1,
        max_constructions: 1,
        max_workers: 2,
      },
      {
        name: 'Starter',
        max_elements: 50,
        max_deposits: 3,
        max_constructions: 2,
        max_workers: 10,
      },
      {
        name: 'Pro',
        max_elements: 200,
        max_deposits: 10,
        max_constructions: 10,
        max_workers: 50,
      },
      {
        name: 'Enterprise',
        max_elements: 1000,
        max_deposits: 50,
        max_constructions: 50,
        max_workers: 500,
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
}
