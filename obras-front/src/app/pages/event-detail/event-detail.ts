import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { EventData } from '../../services/event-data.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.scss',
})
export class EventDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private eventData = inject(EventData);
  private router = inject(Router);

  eventId = Number(this.route.snapshot.paramMap.get('id')?.replace(':', ''));
  event = this.eventData.eventById(this.eventId);

  ngOnInit(): void {
    if (this.eventData.events.length == 0) {
      this.eventData.fetchEvents();
    }
  }

  parseAndFilter(objStr: string | null) {
    if (!objStr) return null;
    try {
      const obj = JSON.parse(objStr);
      if (obj.password) delete obj.password;
      return obj;
    } catch {
      return null;
    }
  }

  getBetterTableName(tableName: string): string {
    const map: Record<string, string> = {
      architect: 'Arquitectos',
      category: 'Categorías',
      construction: 'Construcciones',
      construction_snapshot: 'Snapshots de Construcción',
      construction_worker: 'Obreros de Construcción',
      deposit: 'Depósitos',
      element: 'Elementos',
      element_location: 'Ubicaciones de Elementos',
      element_move_detail: 'Movimientos de Elementos',
      events_history: 'Historial de Eventos',
      migrations: 'Migraciones',
      missing: 'Elementos Faltantes',
      note: 'Notas',
      plan_limit: 'Planes de Límite',
    };
    // Si no está, capitaliza y muestra el nombre original
    return (
      map[tableName] || tableName.charAt(0).toUpperCase() + tableName.slice(1)
    );
  }

  getBetterTypeName(nameType: string): string {
    const map: Record<string, string> = {
      architect: 'Arquitecto',
      construction_worker: 'Obrero',
    };
    // Si no está, capitaliza y muestra el nombre original
    return (
      map[nameType] || nameType.charAt(0).toUpperCase() + nameType.slice(1)
    );
  }
  goBack() {
    this.router.navigate(['/events']);
  }
}
