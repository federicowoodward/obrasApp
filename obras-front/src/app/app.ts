import { Component, signal, computed, effect, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MenuComponent } from './shared/menu/menu';
import { MissingMenu } from './shared/missing-menu/missing-menu';
import { Button } from 'primeng/button';
import { MenuService } from './services/menu.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, MissingMenu, Button, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private router = inject(Router);
  private menuService = inject(MenuService);
  private _currentUrl = signal(this.router.url);
  protected title = 'obrasApp';
  responsiveMenu = signal(this.menuService.value);
  isLoginRoute = computed(() => this._currentUrl() === '/login');

  constructor() {
    effect(() => {
      const sub = this.router.events.subscribe(() => {
        this._currentUrl.set(this.router.url);
      });
      return () => sub.unsubscribe();
    });

    effect(() => {
      const sub = this.menuService.state$.subscribe((open) => {
        this.responsiveMenu.set(open);
      });
      return () => sub.unsubscribe();
    });
  }

  toggleMenu() {
    if (!this.responsiveMenu()) this.menuService.open();
  }
}
