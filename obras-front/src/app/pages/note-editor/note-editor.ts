import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize, take } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MessageService, ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabel } from 'primeng/iftalabel';

import {
  NotesService,
  NoteCreateDto,
  NoteUpdateDto,
} from '../../services/notes.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    ConfirmPopupModule,
    InputTextModule,
    IftaLabel,
  ],
  templateUrl: './note-editor.html',
  styleUrl: './note-editor.scss',
  providers: [MessageService, ConfirmationService],
})
export class NoteEditor implements OnInit {
  private notes = inject(NotesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private msg = inject(MessageService);
  private confirm = inject(ConfirmationService);
  private auth = inject(AuthService);

  mode: 'create' | 'edit' = 'create';
  noteId?: number;
  elementId?: number;
  busy = false;

  form = this.fb.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
  });

  get headerTitle() {
    return this.mode === 'edit' ? 'Editar nota' : 'Nueva nota';
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id')!;
    if (idParam === 'new') {
      // Modo crear: requiere elementId en query
      this.mode = 'create';
      const el = Number(this.route.snapshot.queryParamMap.get('elementId') || 0);
      this.elementId = el || undefined;
      if (!this.elementId) {
        this.msg.add({ severity: 'warn', summary: 'Falta elementId en la URL' });
      }
    } else {
      // Modo editar: cargar nota por id
      this.mode = 'edit';
      this.noteId = Number(idParam);
      if (!this.noteId) {
        this.msg.add({ severity: 'error', summary: 'ID de nota inválido' });
        this.navigateBack();
        return;
      }
      this.notes.getById(this.noteId).pipe(take(1)).subscribe({
        next: (note) => {
          if (!note) {
            this.msg.add({ severity: 'warn', summary: 'Nota no encontrada' });
            this.navigateBack();
            return;
          }
          this.elementId = note.element?.id;
          this.form.patchValue({ title: note.title, text: note.text });
        },
        error: () =>
          this.msg.add({ severity: 'error', summary: 'No se pudo cargar la nota' }),
      });
    }
  }

  save() {
    if (this.form.invalid || this.busy) return;
    const userId = this.auth.user()?.id!;
    this.busy = true;

    if (this.mode === 'edit' && this.noteId) {
      const dto: NoteUpdateDto = {
        title: this.form.value.title!,
        text: this.form.value.text!,
        updatedBy: userId,
        updatedByType: 'architect',
      };
      this.notes.update(this.noteId, dto)
        .pipe(finalize(() => (this.busy = false)))
        .subscribe({
          next: () => {
            this.msg.add({ severity: 'success', summary: 'Nota guardada' });
            this.navigateBack();
          },
          error: () =>
            this.msg.add({ severity: 'error', summary: 'Error al guardar' }),
        });
    } else {
      if (!this.elementId) {
        this.msg.add({ severity: 'error', summary: 'Falta elementId' });
        this.busy = false;
        return;
      }
      const dto: NoteCreateDto = {
        title: this.form.value.title!,
        text: this.form.value.text!,
        element: { id: this.elementId },
        createdBy: userId,
        createdByType: 'architect',
      };
      this.notes.create(dto)
        .pipe(finalize(() => (this.busy = false)))
        .subscribe({
          next: () => {
            this.msg.add({ severity: 'success', summary: 'Nota creada' });
            this.navigateBack();
          },
          error: () =>
            this.msg.add({ severity: 'error', summary: 'Error al crear' }),
        });
    }
  }

  confirmDelete(event: Event) {
    if (this.mode !== 'edit' || !this.noteId) return;
    this.confirm.confirm({
      target: event.currentTarget as HTMLElement,
      message: '¿Seguro que deseas borrar esta nota?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: { label: 'Borrar', severity: 'danger' },
      rejectButtonProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
      accept: () => this.delete(),
    });
  }

  private delete() {
    const userId = this.auth.user()?.id!;
    this.busy = true;
    this.notes
      .delete(this.noteId!, { deletedBy: userId, deletedByType: 'architect' })
      .pipe(finalize(() => (this.busy = false)))
      .subscribe({
        next: () => {
          this.msg.add({ severity: 'success', summary: 'Nota eliminada' });
          this.navigateBack();
        },
        error: () =>
          this.msg.add({ severity: 'error', summary: 'Error al eliminar' }),
      });
  }

  navigateBack() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    if (returnUrl) this.router.navigateByUrl(returnUrl);
    else this.router.navigate(['/notes']);
  }
}
