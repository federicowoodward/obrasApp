import { Injectable, signal, computed } from '@angular/core';
import { ApiService } from '../core/api';
import { Observable, of } from 'rxjs';
import { finalize, shareReplay, tap } from 'rxjs/operators';
import { Element } from '../models/interfaces.model';

export type CategoryOpt = { id: number; name: string };
export type LocationOpt = {
  key: string;
  id: number;
  type: 'deposit' | 'construction';
  name: string;
};

@Injectable({ providedIn: 'root' })
export class ElementsService {
  elements = signal<Element[]>([]);

  // 🔹 Categorías únicas derivadas
  categories = computed<CategoryOpt[]>(() => {
    const map = new Map<number, CategoryOpt>();
    for (const el of this.elements()) {
      const c = (el as any)?.category;
      if (c?.id && !map.has(c.id)) map.set(c.id, { id: c.id, name: c.name });
    }
    return Array.from(map.values());
  });

  // 🔹 Ubicaciones únicas derivadas (por tipo + id)
  locations = computed<LocationOpt[]>(() => {
    const map = new Map<string, LocationOpt>();
    for (const el of this.elements()) {
      const loc = (el as any)?.location;
      if (!loc?.locationType || !loc?.locationId) continue;
      const key = `${loc.locationType}:${loc.locationId}`;
      if (!map.has(key)) {
        map.set(key, {
          key,
          id: loc.locationId,
          type: loc.locationType,
          // Si más adelante unís con los nombres reales, reemplazá el label:
          name:
            loc.locationType === 'deposit'
              ? `Depósito #${loc.locationId}`
              : `Obra #${loc.locationId}`,
        });
      }
    }
    return Array.from(map.values());
  });

  private _loaded = signal(false);
  private _loading = signal(false);
  private inflight$?: Observable<Element[]>; // <- cache de la request en curso

  constructor(private api: ApiService) {}

  /** Llama a backend y llena signals */
  fetchByArchitect(architectId: number): Observable<Element[]> {
    this._loading.set(true);
    return this.api
      .request<Element[]>('GET', `architect/${architectId}/element`)
      .pipe(
        tap({
          next: (res) => {
            this.elements.set(res);
            this._loaded.set(true);
          },
        }),
        finalize(() => this._loading.set(false))
      );
  }

  init(architectId: number): Observable<Element[]> {
    if (this._loaded()) return of(this.elements());
    if (this._loading() && this.inflight$) return this.inflight$;

    this.inflight$ = this.fetchByArchitect(architectId).pipe(
      shareReplay(1),
      finalize(() => (this.inflight$ = undefined))
    );
    console.log(this.categories());
    return this.inflight$;
  }

  /** Garantiza datos: usa init() */
  ensureLoaded(architectId: number): Observable<Element[]> {
    return this.init(architectId);
  }

  /** Fuerza refresh desde backend (por si hiciste CRUD) */
  refresh(architectId: number): Observable<Element[]> {
    return this.fetchByArchitect(architectId).pipe(shareReplay(1));
  }

  /** Helpers si los necesitás */
  get loaded() {
    return this._loaded();
  }
  get loading() {
    return this._loading();
  }

  /** CRUD con actualización local simple */
  create(architectId: number, dto: any): Observable<void> {
    return this.api
      .request<void>('POST', `architect/${architectId}/element`, dto)
      .pipe(
        tap(() => {
          // tras crear, refrescamos para mantener consistencia
          this.fetchByArchitect(architectId).subscribe();
        })
      );
  }

  update(architectId: number, elementId: number, dto: any): Observable<void> {
    return this.api
      .request<void>(
        'PUT',
        `architect/${architectId}/element/${elementId}`,
        dto
      )
      .pipe(
        tap(() => {
          this.fetchByArchitect(architectId).subscribe();
        })
      );
  }

  delete(architectId: number, elementId: number): Observable<void> {
    return this.api
      .request<void>('DELETE', `architect/${architectId}/element/${elementId}`)
      .pipe(
        tap(() => {
          this.elements.set(this.elements().filter((e) => e.id !== elementId));
        })
      );
  }
}
