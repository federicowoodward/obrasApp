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

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: Dashboard, canActivate: [AuthGuard] },
  {
    path: 'construction-workers',
    component: ConstructionWorkers,
    canActivate: [AuthGuard],
  },
  {
    path: 'constructions',
    component: ConstructionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'construction/:id',
    component: ConstructionDetail,
    canActivate: [AuthGuard],
  },
  { path: 'deposit', component: Deposit, canActivate: [AuthGuard] },
  { path: 'events', component: Events, canActivate: [AuthGuard] },
  { path: 'missings', component: MissingRegistry, canActivate: [AuthGuard] },
  { path: 'event/:id', component: EventDetail, canActivate: [AuthGuard] },
  { path: 'notes', component: Notes, canActivate: [AuthGuard] },
  { path: 'note-editor/:id', component: NoteEditor, canActivate: [AuthGuard] },
  { path: 'note-editor/new', component: NoteEditor, canActivate: [AuthGuard] },
  { path: 'worker/elements', component: Deposit },
  {
    path: 'worker/missings',
    component: MissingRegistry,
    canActivate: [AuthGuard],
  },
  { path: 'worker/notas', component: Notes, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' },
];
