import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from 'src/shared/entities/note.entity';
import { Element } from 'src/shared/entities/element.entity';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { EventsHistoryLoggerModule } from 'src/shared/services/events-history/events-history-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Element]), EventsHistoryLoggerModule],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
