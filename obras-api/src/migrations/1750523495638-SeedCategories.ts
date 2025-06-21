import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCategories1750523495638 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Categorías
    await queryRunner.query(`
          INSERT INTO category (name)
          VALUES 
            ('material'),
            ('herramienta'),
            ('elemento de seguridad');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DELETE FROM category WHERE name IN ('material', 'herramienta', 'elemento de seguridad');
        `);
  }
}
