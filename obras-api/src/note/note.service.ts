import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from 'src/shared/entities/note.entity';
import { Element } from 'src/shared/entities/element.entity';
import { Repository } from 'typeorm';
import { EventsHistoryLoggerService } from 'src/shared/services/events-history/events-history-logger.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { DeleteNoteDto } from './dto/delete-note.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note) 
    private readonly noteRepo: Repository<Note>,
    @InjectRepository(Element)
    private readonly elementRepo: Repository<Element>,

    private readonly logger: EventsHistoryLoggerService,
  ) {}

  async create(dto: CreateNoteDto) {
    const note = this.noteRepo.create({
      title: dto.title,
      text: dto.text,
      element: dto.element,
      createdBy: dto.createdBy,
      createdByType: dto.createdByType,
    });
    const saved = await this.noteRepo.save(note);

    await this.logger.logEvent({
      table: 'note',
      recordId: saved.id,
      action: 'create',
      actorId: dto.createdBy,
      actorType: dto.createdByType as 'architect' | 'worker',
      newData: saved,
    });

    return saved;
  }

  async findByElement(elementId: number) {
    return this.noteRepo.find({
      where: { element: { id: elementId } },
    });
  }

  async update(id: number, dto: UpdateNoteDto) {
    const note = await this.noteRepo.findOne({ where: { id } });
    if (!note) throw new NotFoundException('Nota no encontrada');

    const before = { ...note };

    note.title = dto.title;
    note.text = dto.text;
    const saved = await this.noteRepo.save(note);

    await this.logger.logEvent({
      table: 'note',
      recordId: saved.id,
      action: 'update',
      actorId: dto.created_by,
      actorType: dto.created_by_type as 'architect' | 'worker',
      oldData: before,
      newData: saved,
    });

    return saved;
  }

  async delete(id: number, dto: DeleteNoteDto) {
    const note = await this.noteRepo.findOne({ where: { id } });
    if (!note) throw new NotFoundException('Nota no encontrada');

    // 1) Desasociar por si el FK todavía no tiene ON DELETE SET NULL
    await this.elementRepo
      .createQueryBuilder()
      .update(Element)
      .set({ note: null })
      .where('note_id = :id', { id })
      .execute();

    // 2) Borrar la nota
    await this.noteRepo.remove(note);

    // 3) Log
    await this.logger.logEvent({
      table: 'note',
      recordId: note.id,
      action: 'delete',
      actorId: dto.deleted_by,
      actorType: dto.deleted_by_type as 'architect' | 'worker',
      oldData: note,
    });

    return { deleted: true };
  }
}
