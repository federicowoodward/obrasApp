// src/construction/construction.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Construction } from 'src/shared/entities/construction.entity';
import { Repository } from 'typeorm';
import { CreateConstructionDto } from './dto/create-construction.dto';
import { Architect } from 'src/shared/entities/architect.entity';

@Injectable()
export class ConstructionService {
  constructor(
    @InjectRepository(Construction)
    private readonly constructionRepo: Repository<Construction>,

    @InjectRepository(Architect)
    private readonly architectRepo: Repository<Architect>,
  ) {}

  async create(architectId: number, dto: CreateConstructionDto) {
    const architect = await this.architectRepo.findOne({ where: { id: architectId } });
    if (!architect) throw new NotFoundException('Arquitecto no encontrado');

    const construction = this.constructionRepo.create({
      title: dto.title,
      description: dto.description,
      architect,
    });

    return this.constructionRepo.save(construction);
  }

  async findAllByArchitect(architectId: number) {
    return this.constructionRepo.find({
      where: { architect: { id: architectId } },
      relations: ['construction_workers'],
    });
  }

  async delete(id: number, architectId: number) {
    const found = await this.constructionRepo.findOne({ where: { id, architect: { id: architectId } } });
    if (!found) throw new NotFoundException('Construcción no encontrada o no pertenece a este arquitecto');

    await this.constructionRepo.remove(found);
    return { deleted: true };
  }

  async update(id: number, architectId: number, dto: CreateConstructionDto) {
    const construction = await this.constructionRepo.findOne({ where: { id, architect: { id: architectId } } });
    if (!construction) throw new NotFoundException('Construcción no encontrada');

    construction.title = dto.title;
    construction.description = dto.description;

    return this.constructionRepo.save(construction);
  }
}
