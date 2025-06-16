import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Works } from './pages/works/works';
import { Work } from './pages/work/work';
import { Deposit } from './pages/deposit/deposit';
import { Events } from './pages/events/events';
import { Notes } from './pages/notes/notes';
import { Workers } from './pages/workers/workers';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'workers', component: Workers },
  { path: 'works', component: Works },
  { path: 'work/:id', component: Work },
  { path: 'deposit', component: Deposit },
  { path: 'events', component: Events },
  { path: 'notes', component: Notes },
];
