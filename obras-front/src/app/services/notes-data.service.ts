import { Injectable, signal } from '@angular/core';
import { ApiService } from '../core/http/api';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Ajustá este modelo si tu interfaz real tiene más campos
export interface Note {
  id: number;
  title: string;
  text: string;
  createdAt: string;
  // opcionales
  createdBy?: number;
  createdByType?: 'architect' | 'worker';
}

export interface NoteCreateDto {
  title: string;
  text: string;
  element: number | { id: number }; // el back acepta cualquiera de las 2
  createdBy: number;
  createdByType: 'architect' | 'worker';
}

export interface NoteUpdateDto {
  title: string;
  text: string;
  updatedBy: number;
  updatedByType: 'architect' | 'worker';
}

export interface NoteDeleteDto {
  deletedBy: number;
  deletedByType: 'architect' | 'worker';
}

@Injectable({ providedIn: 'root' })
export class NoteData {
  notes = signal<Note[]>([]);

  constructor(private api: ApiService) {}

  fetchByElement(elementId: number): void {
    this.api.request<Note[]>('GET', `note/element/${elementId}`).subscribe({
      next: (res) => this.notes.set(res),
      error: () => {
        // opcional: toast
      },
    });
  }

  createNote(dto: NoteCreateDto): Observable<Note> {
    return this.api.request<Note>('POST', `note`, dto).pipe(
      tap((created) => this.notes.update((curr) => [created, ...curr]))
    );
  }

  updateNote(id: number, dto: NoteUpdateDto): Observable<Note> {
    return this.api.request<Note>('PUT', `note/${id}`, dto).pipe(
      tap((updated) =>
        this.notes.update((curr) => curr.map((n) => (n.id === updated.id ? updated : n)))
      )
    );
  }

  deleteNote(id: number, dto: NoteDeleteDto): Observable<{ deleted: boolean }> {
    return this.api.request<{ deleted: boolean }>('DELETE', `note/${id}`, dto).pipe(
      tap(() => this.notes.update((curr) => curr.filter((n) => n.id !== id)))
    );
  }
}
