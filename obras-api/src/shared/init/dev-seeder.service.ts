import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Architect } from '../entities/architect.entity';
import { Construction } from '../entities/construction.entity';
import { ConstructionWorker } from '../entities/construction-worker.entity';
import { Deposit } from '../entities/deposit.entity';
import { Element } from '../entities/element.entity';
import { Note } from '../entities/note.entity';
import { Missing } from '../entities/missing.entity';
import { Category } from '../entities/category.entity';
import { PlanLimit } from '../entities/plan-limit.entity';
import { LocationType } from '../enums/location-type.enum';

@Injectable()
export class DevSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DevSeederService.name);

  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(PlanLimit) private planRepo: Repository<PlanLimit>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Architect) private architectRepo: Repository<Architect>,
    @InjectRepository(Construction)
    private constructionRepo: Repository<Construction>,
    @InjectRepository(ConstructionWorker)
    private workerRepo: Repository<ConstructionWorker>,
    @InjectRepository(Deposit) private depositRepo: Repository<Deposit>,
    @InjectRepository(Element) private elementRepo: Repository<Element>,
    @InjectRepository(Note) private noteRepo: Repository<Note>,
    @InjectRepository(Missing) private missingRepo: Repository<Missing>,
  ) {}

  async onApplicationBootstrap() {
    if (process.env.NODE_ENV !== 'development') {
      this.logger.log('⏭️ DevSeeder omitido (NODE_ENV != development).');
      return;
    }

    try {
      this.logger.log('🔁 Reset + seed DEV iniciando…');

      await this.dataSource.transaction(async (m) => {
        await m.query(`
          DO $$ BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'location_type_enum') THEN
              CREATE TYPE location_type_enum AS ENUM ('construction', 'deposit');
            END IF;
          END $$;
        `);

        await m.query(`
          ALTER TABLE "element"
            ADD COLUMN IF NOT EXISTS "current_location_type" location_type_enum NULL,
            ADD COLUMN IF NOT EXISTS "current_location_id"   integer NULL;
        `);

        await m.query(`
          TRUNCATE TABLE 
            "element",
            "note",
            "missing",
            "deposit",
            "construction_worker",
            "construction",
            "architect",
            "category",
            "plan_limit"
          RESTART IDENTITY CASCADE;
        `);

        // 2) Planes
        const [free, pro] = await m.save(PlanLimit, [
          m.create(PlanLimit, {
            name: 'Free',
            maxElements: 10,
            maxDeposits: 1,
            maxConstructions: 1,
            maxWorkers: 2,
          }),
          m.create(PlanLimit, {
            name: 'Pro',
            maxElements: 9999,
            maxDeposits: 50,
            maxConstructions: 50,
            maxWorkers: 500,
          }),
        ]);

        // 3) Categorías
        const [herr, mat] = await m.save(Category, [
          m.create(Category, { name: 'Herramienta' }),
          m.create(Category, { name: 'Material' }),
        ]);

        // 4) Arquitecto
        const saltRounds = 10;
        const raw = '1234';
        const hash = await bcrypt.hash(raw, saltRounds);
        const arch = await m.save(
          Architect,
          m.create(Architect, {
            name: 'Federico Lopez',
            email: 'fede@ejemplo.com',
            password: hash,
            paymentLevel: pro,
          }),
        );

        const constr = await m.save(
          Construction,
          m.create(Construction, {
            title: 'Edificio Las Torres',
            description: 'Construcción de torres en centro',
            architect: arch,
          }),
        );

        const [worker1, worker2] = await m.save(ConstructionWorker, [
          m.create(ConstructionWorker, {
            name: 'juan@ejemplo.com',
            password: hash,
            architect: arch,
            construction: constr,
          }),
          m.create(ConstructionWorker, {
            name: 'lucas@ejemplo.com',
            password: hash,
            architect: arch,
            construction: constr,
          }),
        ]);

        const depo = await m.save(
          Deposit,
          m.create(Deposit, {
            name: 'Depósito Central',
            architect: arch,
          }),
        );

        // 6) Nota (1–1 opcional con Element)
        const note1 = await m.save(
          Note,
          m.create(Note, {
            title: 'Nota inicial',
            text: 'Material entregado correctamente',
            createdBy: arch.id,
            createdByType: 'architect',
          }),
        );

        // 7) Elements (👉 ahora con ubicación directa en las columnas nuevas)
        const el1 = await m.save(
          Element,
          m.create(Element, {
            name: 'Hormigonera',
            brand: 'Baukraft',
            provider: 'Ferretería Central',
            buyDate: '2024-01-15',
            architect: arch,
            category: herr,
            note: note1,
            currentLocationType: LocationType.DEPOSIT, // <—
            currentLocationId: depo.id, // <—
          }),
        );

        const el2 = await m.save(
          Element,
          m.create(Element, {
            name: 'Bolsa de Cemento',
            brand: 'Loma Negra',
            provider: 'Corralón Oeste',
            buyDate: '2024-03-02',
            architect: arch,
            category: mat,
            note: null,
            currentLocationType: LocationType.CONSTRUCTION, // <—
            currentLocationId: constr.id, // <—
          }),
        );

        // 8) Missings
        await m.save(
          Missing,
          m.create(Missing, {
            title: 'Falta casco de seguridad',
            text: 'Se necesita casco adicional',
            architect: arch,
            construction: constr,
            constructionWorker: worker1,
          }),
        );
      });

      this.logger.log('✅ Reset + seed DEV completados.');
    } catch (e) {
      this.logger.error('❌ Fallaron las migraciones DEV:', e);
    }
  }
}
