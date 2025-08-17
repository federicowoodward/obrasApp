import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

import { AuthService } from './services/auth.service';
import { MenuComponent } from './shared/menu/menu';
import { DrawerVisibility } from './services/drawer_visibility.service';
import { MissingMenu } from './shared/missing-menu/missing-menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DrawerModule,
    ButtonModule,
    CommonModule,
    MenuComponent,
    MissingMenu,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private router = inject(Router);
  drawerVisibility = inject(DrawerVisibility);
  authService = inject(AuthService);

  private _currentUrl = signal(this.router.url);
  isLoginRoute = computed(() => this._currentUrl() === '/login');

  constructor() {
    this.authService.isAuthenticated?.();

    effect(() => {
      const sub = this.router.events.subscribe(() => {
        this._currentUrl.set(this.router.url);
      });
      return () => sub.unsubscribe();
    });
  }

  get sidebarVisible() {
    return this.drawerVisibility.sidebarVisible();
  }
  set sidebarVisible(b: boolean) {
    this.drawerVisibility.sidebarVisible.set(b);
  }

  openDrawer() {
    this.drawerVisibility.openSidebar();
  }
}
