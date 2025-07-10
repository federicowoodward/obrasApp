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
  private _currentUrl = signal(this.router.url);

  constructor(private menuService: MenuService) {
    effect(() => {
      const sub = this.router.events.subscribe(() => {
        this._currentUrl.set(this.router.url);
      });
      return () => sub.unsubscribe();
    });
  }
  isLoginRoute = computed(() => this._currentUrl() === '/login');

  protected title = 'obrasApp';
  responsiveMenu = false;

  toggleMenu() {
    this.menuService.toggle();
  }
}
