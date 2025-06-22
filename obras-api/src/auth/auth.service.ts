// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Architect } from 'src/shared/entities/architect.entity';
import { ConstructionWorker } from 'src/shared/entities/construction-worker.entity';
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
    const architect = await this.architectRepo
      .createQueryBuilder('architect')
      .where(
        'architect.email = :emailOrName OR architect.name = :emailOrName',
        { emailOrName },
      )
      .getOne();

    if (architect && (await bcrypt.compare(password, architect.password))) {
      return {
        role: 'architect',
        user: {
          id: architect.id,
          name: architect.name,
          email: architect.email,
        },
      };
    }

    const worker = await this.workerRepo.findOne({
      where: { name: emailOrName },
    });

    if (worker && (await bcrypt.compare(password, worker.password))) {
      return {
        role: 'worker',
        user: {
          id: worker.id,
          name: worker.name,
          constructionId: worker.construction?.id ?? null,
        },
      };
    }

    return null;
  }
}
