import { Injectable, signal, computed } from '@angular/core';
import { ApiService } from '../core/api';

@Injectable({
  providedIn: 'root',
})
export class EventData {
  events = signal<any[]>([]);

  constructor(private api: ApiService) {}

  fetchEvents() {
    this.api.request<any[]>('GET', 'events-history').subscribe({
      next: (res) => this.events.set(res),
      error: () => {
        throw new Error('Eventos no encontrados.');
      },
    });
  }

  eventById(id: number) {
    return computed(() => this.events().find((ev) => ev.id === id) ?? null);
  }
}
