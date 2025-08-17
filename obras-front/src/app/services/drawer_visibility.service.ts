import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DrawerVisibility {
  readonly sidebarVisible = signal(false);

  openSidebar() { this.sidebarVisible.set(true); }
  closeSidebar() { this.sidebarVisible.set(false); }
  toggleSidebar() { this.sidebarVisible.update(v => !v); }
}
