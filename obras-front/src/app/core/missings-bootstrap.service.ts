// core/missings-bootstrap.service.ts
import { DestroyRef, Injectable, effect, inject } from '@angular/core';
import { MissingsService } from '../services/missings.service';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../services/auth.service';

const DEFAULT_POLL_MS = 60_000 * 5;

@Injectable({ providedIn: 'root' })
export class MissingsBootstrapService {
  private missings = inject(MissingsService);
  private auth = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  private startedForId: number | null = null;

  /** Arranque reactivo al login de arquitecto */
  autoStart(pollMs = DEFAULT_POLL_MS) {
    effect(
      () => {
        const role = this.auth.role();
        const user = this.auth.user();

        // Sólo para arquitecto logueado
        if (role !== 'architect' || !user) return;

        // 👇 Ajustá si tu user tiene otro campo que mapea al Architect.id
        const architectId = user.id;

        if (!architectId || this.startedForId === architectId) return;
        this.startedForId = architectId;

        // Fetch inicial
        this.missings.initForArchitect(architectId).subscribe();

        // Polling suave
        timer(pollMs, pollMs)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => this.missings.refresh().subscribe());
      },
      { allowSignalWrites: true }
    );
  }

  /** Alternativa manual desde un layout */
  start(architectId: number, pollMs = DEFAULT_POLL_MS) {
    if (this.startedForId === architectId) return;
    this.startedForId = architectId;

    this.missings.initForArchitect(architectId).subscribe();
    timer(pollMs, pollMs)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.missings.refresh().subscribe());
  }
}
