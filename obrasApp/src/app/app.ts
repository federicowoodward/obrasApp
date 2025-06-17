import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu';
import { MissingMenu } from './shared/missing-menu/missing-menu';
import { Button } from 'primeng/button';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, MissingMenu, Button],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(private menuService: MenuService) {}

  protected title = 'obrasApp';
  responsiveMenu = false;

  toggleMenu() {
    this.menuService.toggle();
  }
}
