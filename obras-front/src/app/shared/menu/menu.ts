import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Menu } from 'primeng/menu';
import { MenuService } from '../../services/menu.service';
import { CommonModule } from '@angular/common';
import { Drawer } from 'primeng/drawer';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  imports: [Menu, CommonModule, Drawer],
})
export class MenuComponent implements OnInit, OnDestroy {
  @Input() responsiveMenu: boolean = false;
  @Output() closeMenu = new EventEmitter<void>();

  items: MenuItem[] = [];
  activePath: string = '';
  private authService = inject(AuthService);
  private router = inject(Router);
  private menuService = inject(MenuService);
  private navSub!: Subscription;
  private menuSub!: Subscription;

  ngOnInit() {
    // Inicializo ítems según la ruta actual
    this.setItems(this.router.url);

    // Actualizo items y activa la clase según navegación
    this.navSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setItems(event.urlAfterRedirects);
        // Siempre cerrar menú al navegar
        this.menuService.close();
        this.closeMenu.emit();
      });

    // Sincronizo estado del menuService → prop local
    this.menuSub = this.menuService.state$.subscribe((state) => {
      this.responsiveMenu = state;
    });
  }

  ngOnDestroy() {
    this.navSub?.unsubscribe();
    this.menuSub?.unsubscribe();
  }

  // Cierra el menú tras la animación del Drawer
  onDrawerHide() {
    this.menuService.close();
    this.closeMenu.emit();
  }

  // --- lógica del menú ---
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
        routerLink: ['construction-workers'],
        styleClass: this.isActive('workers') ? 'active' : '',
      },
      {
        label: 'Obras',
        icon: 'pi pi-briefcase',
        routerLink: ['constructions'],
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
      {
        label: 'Salir',
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.logout();
          this.router.navigate(['/login']);
        },
      },
    ];
  }

  private isActive(path: string): boolean {
    return this.activePath === `/${path}`;
  }
}
