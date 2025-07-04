import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Architect } from '../entities/architect.entity';
import { Construction } from '../entities/construction.entity';
import { ConstructionWorker } from '../entities/construction-worker.entity';
import { Deposit } from '../entities/deposit.entity';
import { Element } from '../entities/element.entity';
import { ElementLocation } from '../entities/element-location.entity';
import { Note } from '../entities/note.entity';
import { Missing } from '../entities/missing.entity';

@Injectable()
export class DevSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DevSeederService.name);

  constructor(
    @InjectRepository(Architect)
    private architectRepo: Repository<Architect>,
    @InjectRepository(Construction)
    private constructionRepo: Repository<Construction>,
    @InjectRepository(ConstructionWorker)
    private workerRepo: Repository<ConstructionWorker>,
    @InjectRepository(Deposit)
    private depositRepo: Repository<Deposit>,
    @InjectRepository(Element)
    private elementRepo: Repository<Element>,
    @InjectRepository(ElementLocation)
    private locationRepo: Repository<ElementLocation>,
    @InjectRepository(Note)
    private noteRepo: Repository<Note>,
    @InjectRepository(Missing)
    private missingRepo: Repository<Missing>,
  ) {}

  async onApplicationBootstrap() {
    try {
      this.logger.log('✅ Migraciones de DEV ejecutandose.');
      await this.seedArchitect();
      await this.seedConstruction();
      await this.seedWorkers();
      await this.seedDeposits();
      await this.seedNotes();
      await this.seedElements();
      await this.seedElementLocations();
      await this.seedMissings();
      this.logger.log('✅ Migraciones dev ejecutadas.');
    } catch (e) {
      this.logger.error('❌ Fallaron las migraciones DEV:', e);
    }
  }

  private async seedArchitect() {
    await this.architectRepo.save({
      id: 1,
      name: 'Federico Lopez',
      email: 'fede@ejemplo.com',
      password: 'hashedpassword',
      paymentLevel: { id: 2 },
    });
  }

  private async seedConstruction() {
    await this.constructionRepo.save({
      id: 1,
      title: 'Edificio Las Torres',
      description: 'Construcción de torres en centro',
      architect: { id: 1 },
    });
  }

  private async seedWorkers() {
    await this.workerRepo.save([
      {
        id: 1,
        name: 'Juan Pérez',
        password: 'hashedpassword',
        architect: { id: 1 },
        construction: { id: 1 },
      },
      {
        id: 2,
        name: 'Lucas Gómez',
        password: 'hashedpassword',
        architect: { id: 1 },
        construction: { id: 1 },
      },
    ]);
  }

  private async seedDeposits() {
    await this.depositRepo.save({
      id: 1,
      name: 'Depósito Central',
      architect: { id: 1 },
    });
  }

  private async seedNotes() {
    await this.noteRepo.save({
      id: 1,
      title: 'Nota inicial',
      text: 'Material entregado correctamente',
      createdBy: 1,
      createdByType: 'architect',
    });
  }

  private async seedElements() {
    await this.elementRepo.save({
      id: 1,
      name: 'Hormigonera',
      brand: 'Baukraft',
      provider: 'Ferretería Central',
      buyDate: '2024-01-15',
      architect: { id: 1 },
      category: { id: 2 }, // Herramienta
      note: { id: 1 },
    });
  }

  private async seedElementLocations() {
    await this.locationRepo.save({
      id: 1,
      locationType: 'deposit',
      locationId: 1,
      element: { id: 1 },
    });
  }

  private async seedMissings() {
    await this.missingRepo.save({
      id: 1,
      title: 'Falta casco de seguridad',
      text: 'Se necesita casco adicional',
      architect: { id: 1 },
      construction: { id: 1 },
      constructionWorker: { id: 1 },
    });
  }
}
