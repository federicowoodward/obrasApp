import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { WorkerMenu } from './worker-menu';

@Component({
  selector: 'app-worker-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DrawerModule, ButtonModule, WorkerMenu],
  template: `
  <div class="h-screen flex flex-column">
    <header class="surface-200 p-3 flex align-items-center justify-content-between">
      <div class="text-xl font-bold">Panel de Obrero</div>
      <div class="lg:hidden">
        <p-button (click)="sidebarVisible = true" icon="pi pi-bars"></p-button>
      </div>
    </header>

    <div class="flex flex-1 min-h-0">
      <!-- Sidebar fijo desktop (menú worker) -->
      <aside class="hidden lg:block shrink-0 lg:w-12rem surface-100 p-2">
        <app-worker-menu></app-worker-menu>
      </aside>

      <!-- Drawer mobile -->
      <p-drawer [(visible)]="sidebarVisible" position="left" header="Menú" [modal]="true" closable="false">
        <app-worker-menu></app-worker-menu>
      </p-drawer>

      <!-- Main -->
      <main class="flex-1 overflow-auto p-3 surface-50">
        <router-outlet></router-outlet>
      </main>
    </div>
  </div>
  `,
})
export class WorkerLayout {
  sidebarVisible = false;
}
