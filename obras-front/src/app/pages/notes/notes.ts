import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NoteData } from '../../services/notes-data.service';
import { AuthService } from '../../services/auth.service';
import { NoteEditDialog } from '../../shared/note-edit/note-edit-dialog';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ToastModule,
    ConfirmPopupModule,
    NoteEditDialog,
  ],
  templateUrl: './notes.html',
  styleUrl: './notes.scss',
  providers: [MessageService, ConfirmationService],
})
export class Notes implements OnInit {
  private notesData = inject(NoteData);
  private messageService = inject(MessageService);
  private confirmService = inject(ConfirmationService);
  private authService = inject(AuthService);

  notes = this.notesData.notes;

  editDialogVisible = false;
  noteToEdit: { id?: number; title: string; text: string } | null = null;

  elementId = 1;
  architectId = this.authService.user()?.id || 1;

  ngOnInit() {
    this.notesData.fetchByElement(this.elementId);
  }

  openEditDialog(note: any) {
    this.noteToEdit = { id: note.id, title: note.title, text: note.text };
    this.editDialogVisible = true;
  }

  openAddDialog() {
    this.noteToEdit = null;
    this.editDialogVisible = true;
  }

  onSaveNote(note: { id?: number; title: string; text: string }) {
    if (note.id) {
      this.notesData
        .updateNote(note.id, { title: note.title, text: note.text })
        .subscribe({
          next: () => {
            this.notes.update((arr) =>
              arr.map((n) =>
                n.id === note.id
                  ? { ...n, title: note.title, text: note.text }
                  : n
              )
            );
            this.messageService.add({
              severity: 'success',
              summary: 'Nota actualizada',
            });
            this.editDialogVisible = false;
          },
          error: () =>
            this.messageService.add({
              severity: 'error',
              summary: 'Error al actualizar',
            }),
        });
    } else {
      this.notesData
        .createNote({
          ...note,
          elementId: this.elementId,
          createdBy: this.architectId,
        })
        .subscribe({
          next: (newNote: any) => {
            this.notes.update((arr) => [...arr, newNote]);
            this.messageService.add({
              severity: 'success',
              summary: 'Nota creada',
            });
            this.editDialogVisible = false;
          },
          error: () =>
            this.messageService.add({
              severity: 'error',
              summary: 'Error al crear',
            }),
        });
    }
  }

  confirmDelete(event: Event, note: any) {
    this.confirmService.confirm({
      target: event.currentTarget as HTMLElement,
      message: '¿Seguro que deseas borrar esta nota?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: { label: 'Borrar', severity: 'danger' },
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      accept: () => this.deleteNote(note),
    });
  }

  deleteNote(note: any) {
    this.notesData.deleteNote(note.id, this.architectId).subscribe({
      next: () => {
        this.notes.update((arr) => arr.filter((n) => n.id !== note.id));
        this.messageService.add({
          severity: 'success',
          summary: 'Nota eliminada',
        });
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error al eliminar',
        }),
    });
  }
}
