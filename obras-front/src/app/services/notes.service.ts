import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, throwError, Observable } from 'rxjs';
import { ApiService } from '../core/http/api';
import { AuthService } from '../services/auth.service';

export type UserType = 'architect' | 'worker';

export interface Note {
  id: number;
  title: string;
  text: string;
  createdAt?: string;
  element: { id: number };
  createdBy?: number;
  createdByType?: UserType;
  updatedBy?: number;
  updatedByType?: UserType;
}

export interface NoteCreateDto {
  title: string;
  text: string;
  element: { id: number };
  createdBy: number;
  createdByType: UserType;
}

export interface NoteUpdateDto {
  title: string;
  text: string;
  updatedBy: number;
  updatedByType: UserType;
}

@Injectable({ providedIn: 'root' })
export class NotesService {
  private api = inject(ApiService);
  private router = inject(Router);
  private auth = inject(AuthService);

  /** Normaliza la respuesta del backend a Note | null (soporta objeto, {data}, array o vacío). */
  private unwrapNote(res: any): Note | null {
    if (res == null) return null;

    // { data: ... } o { result: ... }
    if (typeof res === 'object') {
      if ('data' in res) {
        const d = (res as any).data;
        if (Array.isArray(d)) return d.length ? (d[0] as Note) : null;
        return (d as Note) ?? null;
      }
      if ('result' in res) {
        const r = (res as any).result;
        if (Array.isArray(r)) return r.length ? (r[0] as Note) : null;
        return (r as Note) ?? null;
      }
    }

    // Array directo [] | [note]
    if (Array.isArray(res)) return res.length ? (res[0] as Note) : null;

    // Objeto directo
    return (res as Note) ?? null;
  }

  /** Devuelve la nota del elemento o null si no existe. */
  getByElement(elementId: number): Observable<Note | null> {
    return this.api.request<any>('GET', `note/${elementId}`).pipe(
      map((res) => this.unwrapNote(res)),
      catchError((err) => {
        if (err?.status === 404) return of(null);
        return throwError(() => err);
      })
    );
  }

  /** True/False si existe nota para el elemento (para *ngIf). */
  hasNoteForElement(elementId: number) {
    return this.getByElement(elementId).pipe(map((n) => !!n));
  }

  /** Devuelve el noteId o null (permite decidir y navegar con un solo observable). */
  noteIdForElement(elementId: number) {
    return this.getByElement(elementId).pipe(map((n) => n?.id ?? null));
  }

  /** CRUD */
  getById(id: number) {
    return this.api.request<any>('GET', `note/${id}`).pipe(map((res) => this.unwrapNote(res)));
  }

  create(dto: NoteCreateDto) {
    return this.api.request<Note>('POST', `note`, dto);
  }

  update(id: number, dto: NoteUpdateDto) {
    return this.api.request<Note>('PUT', `note/${id}`, dto);
  }

  // Ojo: tu ApiService DELETE manda auditoría como params (4º arg)
  delete(id: number, audit: { deletedBy: number; deletedByType: UserType }) {
    return this.api.request<void>('DELETE', `note/${id}`, undefined, audit);
  }

  /** Navega a crear nota para un elemento. */
  openNewForElement(elementId: number, returnUrl?: string) {
    this.router.navigate(['/note-editor', 'new'], {
      queryParams: { elementId, returnUrl },
    });
  }

  /** Navega a editar una nota existente. */
  openEditorById(noteId: number, returnUrl?: string) {
    this.router.navigate(['/note-editor', noteId], {
      queryParams: { returnUrl },
    });
  }
}
