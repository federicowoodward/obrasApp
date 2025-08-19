import { Injectable, signal } from '@angular/core';
import { ApiService } from '../core/api';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Element } from '../models/interfaces.model';

@Injectable({ providedIn: 'root' })
export class ElementsService {
  elements = signal<Element[]>([]);
  private _loaded = signal(false);
  private _loading = signal(false);

  constructor(private api: ApiService) {}

  /** Carga desde backend y actualiza signal */
  fetchByArchitect(architectId: number): Observable<Element[]> {
    this._loading.set(true);
    return this.api
      .request<Element[]>('GET', `architect/${architectId}/element`)
      .pipe(
        tap({
          next: (res) => {
            this.elements.set(res);
            this._loaded.set(true);
            this._loading.set(false);
          },
          error: () => this._loading.set(false),
        })
      );
  }

  /** Si ya está cargado, devuelve los datos actuales; si no, hace fetch */
  ensureLoaded(architectId: number): Observable<Element[]> {
    if (this._loaded()) return of(this.elements());
    return this.fetchByArchitect(architectId);
  }

  /** CRUD con actualización local simple */
  create(architectId: number, dto: any): Observable<void> {
    return this.api.request<void>('POST', `architect/${architectId}/element`, dto).pipe(
      tap(() => {
        // tras crear, refrescamos para mantener consistencia
        this.fetchByArchitect(architectId).subscribe();
      })
    );
  }

  update(architectId: number, elementId: number, dto: any): Observable<void> {
    return this.api.request<void>('PUT', `architect/${architectId}/element/${elementId}`, dto).pipe(
      tap(() => {
        this.fetchByArchitect(architectId).subscribe();
      })
    );
  }

  delete(architectId: number, elementId: number): Observable<void> {
    return this.api.request<void>('DELETE', `architect/${architectId}/element/${elementId}`).pipe(
      tap(() => {
        this.elements.set(this.elements().filter((e) => e.id !== elementId));
      })
    );
  }
}
