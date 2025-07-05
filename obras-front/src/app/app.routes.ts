import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Works } from './pages/works/works';
import { Work } from './pages/work/work';
import { Deposit } from './pages/deposit/deposit';
import { Events } from './pages/events/events';
import { Notes } from './pages/notes/notes';
import { ConstructionWorkers } from './pages/construction-workers/construction-workers';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'construction-workers', component: ConstructionWorkers },
  { path: 'works', component: Works },
  { path: 'work/:id', component: Work },
  { path: 'deposit', component: Deposit },
  { path: 'events', component: Events },
  { path: 'notes', component: Notes },
];
