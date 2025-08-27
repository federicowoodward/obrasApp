// app.config.ts
import {
  ApplicationConfig /*, provideZoneChangeDetection*/,
  APP_INITIALIZER,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import Preset from './preset';

// ⬇️ IMPORTA el bootstrap del módulo de faltantes
import { MissingsBootstrapService } from './core/missings-bootstrap.service';

// ⬇️ Factory minimalista: arranca auto con intervalo (en ms)
function startMissingsOnBoot() {
  return () => {
    const boot = inject(MissingsBootstrapService);
    boot.start(60_000 * 5); // 5m; cambialo si querés
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Preset,
        options: {
          darkModeSelector: '.dark',
          prefix: 'p',
        },
      },
    }),
    provideHttpClient(withInterceptorsFromDi()),

    // ⬇️ Enganche global (no rompe nada; corre en el boot)
    { provide: APP_INITIALIZER, multi: true, useFactory: startMissingsOnBoot },
  ],
};
