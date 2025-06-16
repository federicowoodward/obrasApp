import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./shared/menu/menu";
import { MissingMenu } from './shared/missing-menu/missing-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, MissingMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'obrasApp';
}
