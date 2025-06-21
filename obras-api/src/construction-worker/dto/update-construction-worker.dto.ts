// src/construction-worker/dto/update-construction-worker.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateConstructionWorkerDto } from './create-construction-worker.dto';

export class UpdateConstructionWorkerDto extends PartialType(CreateConstructionWorkerDto) {}
