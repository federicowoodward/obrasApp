import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Menu } from 'primeng/menu';
import { MenuService } from '../../services/menu.service';
import { CommonModule } from '@angular/common';
import { Drawer } from 'primeng/drawer';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  imports: [Menu, CommonModule, Drawer],
})
export class MenuComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  activePath: string = '';
  responsiveMenu = false;
  private subs = new Subscription();
  private routerSub!: Subscription;

  constructor(private router: Router, private menuService: MenuService) {}

  ngOnInit() {
    this.setItems(this.router.url);

    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setItems(event.urlAfterRedirects);
      });

    this.subs.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          this.setItems(event.urlAfterRedirects);
        })
    );

    this.subs.add(
      this.menuService.state$.subscribe((state) => {
        this.responsiveMenu = state;
      })
    );
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
    this.subs.unsubscribe();
  }

  private setItems(currentPath: string) {
    this.activePath = currentPath;

    this.items = [
      {
        label: 'Descripción general',
        icon: 'pi pi-home',
        routerLink: [''],
        styleClass: this.isActive('') ? 'active' : '',
      },
      {
        label: 'Trabajadores',
        icon: 'pi pi-users',
        routerLink: ['workers'],
        styleClass: this.isActive('workers') ? 'active' : '',
      },
      {
        label: 'Obras',
        icon: 'pi pi-briefcase',
        routerLink: ['works'],
        styleClass:
          this.isActive('works') || this.activePath.startsWith('/work/')
            ? 'active'
            : '',
      },
      {
        label: 'Deposito',
        icon: 'pi pi-box',
        routerLink: ['deposit'],
        styleClass: this.isActive('deposit') ? 'active' : '',
      },
      {
        label: 'Historial eventos',
        icon: 'pi pi-calendar',
        routerLink: ['events'],
        styleClass: this.isActive('events') ? 'active' : '',
      },
      {
        label: 'Almacén de notas',
        icon: 'pi pi-book',
        routerLink: ['notes'],
        styleClass: this.isActive('notes') ? 'active' : '',
      },
    ];
  }

  private isActive(path: string): boolean {
    return this.activePath === `/${path}`;
  }
}
