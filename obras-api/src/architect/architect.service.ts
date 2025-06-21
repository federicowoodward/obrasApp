// src/architect/architect.service.ts

import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Architect } from '../shared/entities/architect.entity';
import { CreateArchitectDto } from './dto/create-architect.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ArchitectService {
  constructor(
    @InjectRepository(Architect)
    private readonly architectRepo: Repository<Architect>,
  ) {}

  async create(dto: CreateArchitectDto): Promise<Partial<Architect>> {
    const existing = await this.architectRepo.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('Este email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const architect = this.architectRepo.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      payment_level: dto.payment_level ? { id: dto.payment_level } : undefined,
    });

    // falta crear deposito y historial de manera automatica

    const saved = await this.architectRepo.save(architect);

    const { password, ...safeData } = saved;
    return safeData;
  }
}
