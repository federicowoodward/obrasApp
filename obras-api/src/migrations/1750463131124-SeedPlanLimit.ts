import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedPlanLimit1750463131124 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          INSERT INTO plan_limit (name, max_elements, max_deposits, max_constructions, max_workers)
          VALUES 
            ('Free', 10, 1, 1, 2),
            ('Starter', 50, 3, 2, 10),
            ('Pro', 200, 10, 10, 50),
            ('Enterprise', 1000, 50, 50, 500);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DELETE FROM plan_limit WHERE name IN ('Free', 'Starter', 'Pro', 'Enterprise');
        `);
  }
}
