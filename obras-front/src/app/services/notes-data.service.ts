import { Injectable, signal } from '@angular/core';
import { Note } from '../models/interfaces.model';
import { ApiService } from '../core/http/api';

@Injectable({ providedIn: 'root' })
export class NoteData {
  notes = signal<Note[]>([]);

  constructor(private api: ApiService) {}

  fetchByElement(elementId: number) {
    this.api.request<Note[]>('GET', `note/element/${elementId}`).subscribe({
      next: (res) => this.notes.set(res),
      error: () => {},
    });
  }

  updateNote(id: number, dto: Partial<Note>) {
    return this.api.request('PUT', `note/${id}`, dto);
  }

  deleteNote(id: number, architectId: number) {
    return this.api.request('DELETE', `note/${id}/${architectId}`);
  }

  createNote(dto: any) {
    return this.api.request('POST', `note`, dto);
  }
}
