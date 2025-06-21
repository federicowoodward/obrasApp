// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Architect } from 'src/entities/architect.entity';
import { ConstructionWorker } from 'src/entities/construction-worker.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Architect)
    private readonly architectRepo: Repository<Architect>,

    @InjectRepository(ConstructionWorker)
    private readonly workerRepo: Repository<ConstructionWorker>,
  ) {}

  async login({ emailOrName, password }: LoginDto): Promise<any | null> {
    // 1. Intentar arquitecto con email
    const architectEmail = await this.architectRepo.findOne({
      where: { email: emailOrName },
    });
    if (
      architectEmail &&
      (await bcrypt.compare(password, architectEmail.password))
    ) {
      return {
        role: 'architect',
        user: {
          id: architectEmail.id,
          name: architectEmail.name,
          email: architectEmail.email,
        },
      };
    }
    // 2. Intentar arquitecto con name
    const architectName = await this.architectRepo.findOne({
      where: { name: emailOrName },
    });
    if (
      architectName &&
      (await bcrypt.compare(password, architectName.password))
    ) {
      return {
        role: 'architect',
        user: {
          id: architectName.id,
          name: architectName.name,
          email: architectName.email,
        },
      };
    }

    // 2. Intentar obrero
    const worker = await this.workerRepo.findOne({
      where: { name: emailOrName },
    });
    if (worker && (await bcrypt.compare(password, worker.password))) {
      return {
        role: 'worker',
        user: {
          id: worker.id,
          name: worker.name,
          constructionId: worker.construction,
          categoryId: worker.category,
        },
      };
    }

    // Si no se encontró en ninguna
    return null;
  }
}
