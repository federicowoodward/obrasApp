// src/construction-worker/construction-worker.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConstructionWorker } from 'src/shared/entities/construction-worker.entity';
import { CreateConstructionWorkerDto } from './dto/create-construction-worker.dto';
import { UpdateConstructionWorkerDto } from './dto/update-construction-worker.dto';
import { Construction } from 'src/shared/entities/construction.entity';
import * as bcrypt from 'bcryptjs';
import { Category } from 'src/shared/entities/category.entity';

@Injectable()
export class ConstructionWorkerService {
  constructor(
    @InjectRepository(ConstructionWorker)
    private readonly workerRepo: Repository<ConstructionWorker>,

    @InjectRepository(Construction)
    private readonly constructionRepo: Repository<Construction>,

    @InjectRepository(Construction)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(architectId: number, dto: CreateConstructionWorkerDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const construction = await this.constructionRepo.findOne({
      where: { id: dto.constructionId },
    });
    if (!construction)
      throw new NotFoundException('Construcción no encontrada');

    const worker = this.workerRepo.create({
      name: dto.name,
      password: hashedPassword,
      architect: { id: architectId },
      construction: { id: dto.constructionId },
    });

    return await this.workerRepo.save(worker);
  }

  async findAll(architectId: number) {
    return await this.workerRepo.find({
      where: { architect: { id: architectId } },
      relations: ['construction'],
    });
  }

  async findOne(architectId: number, id: number) {
    const worker = await this.workerRepo.findOne({
      where: { id, architect: { id: architectId } },
      relations: ['construction'],
    });

    if (!worker) throw new NotFoundException('Obrero no encontrado');
    return worker;
  }

  async update(
    architectId: number,
    id: number,
    dto: UpdateConstructionWorkerDto,
  ) {
    const worker = await this.findOne(architectId, id);

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    Object.assign(worker, {
      ...dto,
      construction: dto.constructionId
        ? { id: dto.constructionId }
        : worker.construction,
    });

    return await this.workerRepo.save(worker);
  }

  async remove(architectId: number, id: number) {
    const worker = await this.findOne(architectId, id);
    return await this.workerRepo.remove(worker);
  }
}
