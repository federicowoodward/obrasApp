import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { ConstructionComponent } from './pages/construction/construction';
import { ConstructionDetail } from './pages/construction-detail/construction-detail';
import { Deposit } from './pages/deposit/deposit';
import { Events } from './pages/events/events';
import { Notes } from './pages/notes/notes';
import { ConstructionWorkers } from './pages/construction-workers/construction-workers';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { EventDetail } from './pages/event-detail/event-detail';
import { NoteEditor } from './pages/note-editor/note-editor';
import { MissingRegistry } from './pages/missing-registry/missing-registry';

import { ArchitectLayout } from './layouts/architect-layout';
import { WorkerLayout } from './layouts/worker-layout';

export const routes: Routes = [
  // Login sin layout
  { path: 'login', component: LoginComponent },

  // Grupo ARQUITECTO (usa ArchitectLayout)
  {
    path: '',
    component: ArchitectLayout,
    canActivate: [AuthGuard],
    data: { roles: ['architect'] },
    children: [
      { path: '', component: Dashboard },
      { path: 'construction-workers', component: ConstructionWorkers },
      { path: 'constructions', component: ConstructionComponent },
      { path: 'construction/:id', component: ConstructionDetail },
      { path: 'deposit', component: Deposit },
      { path: 'events', component: Events },
      { path: 'missings', component: MissingRegistry },
      { path: 'event/:id', component: EventDetail },
      { path: 'notes', component: Notes },
      { path: 'note-editor/:id', component: NoteEditor },
      { path: 'note-editor/new', component: NoteEditor },
    ],
  },

  // Grupo WORKER (usa WorkerLayout)
  {
    path: 'worker',
    component: WorkerLayout,
    canActivate: [AuthGuard],
    data: { roles: ['worker'] },
    children: [
      { path: 'elements', component: Deposit },
      { path: 'missings', component: MissingRegistry },
      { path: 'notas', component: Notes },
      { path: '', pathMatch: 'full', redirectTo: 'elements' },
    ],
  },

  // Wildcard
  { path: '**', redirectTo: '/login' },
];
