// src/scripts/seed.ts
import { AppDataSource } from '../config/data-source';
import { PlanLimit } from '../shared/entities/plan-limit.entity';
import { Category } from '../shared/entities/category.entity';

async function seed() {
  await AppDataSource.initialize();

  await AppDataSource.getRepository(PlanLimit).save([
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

  await AppDataSource.getRepository(Category).save([
    { name: 'Material' },
    { name: 'Herramienta' },
    { name: 'Elemento de seguridad' },
  ]);

  console.log('Seed data inserted ✔️');
  process.exit(0);
}

seed();
