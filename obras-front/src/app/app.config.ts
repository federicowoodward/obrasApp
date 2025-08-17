import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import Preset from './preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Preset,
        options: {
          darkModeSelector: '.dark', // con esta variable cambia el mode dark
          prefix: 'p',
        },
      },
    }),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
