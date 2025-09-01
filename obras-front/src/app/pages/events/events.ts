import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ApiService } from '../../core/api';
import { AuthService } from '../../services/auth.service';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { IftaLabel } from 'primeng/iftalabel';
import { Router } from '@angular/router';
import { EventData } from '../../services/event-data.service';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    AutoCompleteModule,
    ButtonModule,
    ToastModule,
    SelectModule,
    Dialog,
    IftaLabel,
    DatePicker,
    FormsModule,
  ],
  providers: [MessageService],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events implements OnInit {
  private api = inject(ApiService);
  private authService = inject(AuthService);
  private messsageService = inject(MessageService);
  private eventData = inject(EventData);
  private router = inject(Router);

  events = this.eventData.events;
  filterTable = signal<string | null>(null);
  filterAction = signal<string | null>(null);
  filterActorType = signal<string | null>(null);
  searchText = signal<string>('');
  changedByDialog = signal<{
    id: number;
    name: string;
    createdAt: string;
    email?: string;
  } | null>(null);

  dateFrom = signal<Date | null>(null);
  dateTo = signal<Date | null>(null);

  private startOfDay(d: Date) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }
  private endOfDay(d: Date) {
    const x = new Date(d);
    x.setHours(23, 59, 59, 999);
    return x;
  }

  onDateFromChange(d?: Date) {
    if (!d) {
      this.dateFrom.set(null);
      return;
    }
    if (this.dateTo() && d > this.dateTo()!) {
      this.dateTo.set(d);
      this.messsageService.add({
        severity: 'info',
        summary: 'Rango ajustado',
        detail: '“Desde” > “Hasta”. Se ajustó “Hasta”.',
      });
    }
    this.dateFrom.set(d);
  }

  onDateToChange(d?: Date) {
    if (!d) {
      this.dateTo.set(null);
      return;
    }
    if (this.dateFrom() && d < this.dateFrom()!) {
      this.dateFrom.set(d);
      this.messsageService.add({
        severity: 'info',
        summary: 'Rango ajustado',
        detail: '“Hasta” < “Desde”. Se ajustó “Desde”.',
      });
    }
    this.dateTo.set(d);
  }

  ngOnInit() {
    this.eventData.fetchEvents();
  }

  // Opciones de filtros (adaptá a tus tablas/acciones reales)
  tableOptions = [
    { label: 'Todos', value: null },
    { label: 'Elemento', value: 'element' },
    { label: 'Obrero', value: 'construction_worker' },
    { label: 'Obra', value: 'construction' },
    { label: 'Depósito', value: 'deposit' },
    { label: 'Nota', value: 'note' },
    { label: 'Arquitecto', value: 'architect' },
  ];
  actionOptions = [
    { label: 'Todos', value: null },
    { label: 'Creado', value: 'creado' },
    { label: 'Actualización', value: 'actualizado' },
    { label: 'Eliminación', value: 'eliminado' },
    { label: 'Movimiento', value: 'movido' },
    { label: 'Asignación', value: 'asignado' },
  ];
  actorTypeOptions = [
    { label: 'Todos', value: null },
    { label: 'Arquitecto', value: 'architect' },
    { label: 'Obrero', value: 'worker' },
  ];

  filteredEvents = computed(() => {
    let ev = this.events();

    const from = this.dateFrom();
    const to = this.dateTo();

    if (from) {
      const f = this.startOfDay(from);
      ev = ev.filter((e) => new Date(e.createdAt) >= f);
    }
    if (to) {
      const t = this.endOfDay(to);
      ev = ev.filter((e) => new Date(e.createdAt) <= t);
    }

    // Filtro por tabla
    if (this.filterTable())
      ev = ev.filter((e) => e.tableName === this.filterTable());

    // Filtro por tipo de acción (match parcial en español)
    if (this.filterAction())
      ev = ev.filter((e) =>
        e.action.toLowerCase().includes(this.filterAction()!)
      );

    // Filtro por tipo de usuario
    if (this.filterActorType())
      ev = ev.filter((e) => e.changedByType === this.filterActorType());

    // Búsqueda global
    if (this.searchText()) {
      const txt = this.searchText().toLowerCase();
      ev = ev.filter(
        (e) =>
          e.action.toLowerCase().includes(txt) ||
          e.tableName.toLowerCase().includes(txt) ||
          e.recordId.toString().includes(txt) ||
          (e.oldData &&
            JSON.stringify(e.oldData).toLowerCase().includes(txt)) ||
          (e.newData && JSON.stringify(e.newData).toLowerCase().includes(txt))
      );
    }

    return ev;
  });

  onTableChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.filterTable.set(value || null);
  }
  onActionChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.filterAction.set(value || null);
  }
  onActorChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.filterActorType.set(value || null);
  }
  fetchEvents() {
    this.api.request<any[]>('GET', `events-history`).subscribe({
      next: (res) => this.events.set(res),
      error: () => {
        // Podés agregar un toast si querés
      },
    });
  }
  resetFilters() {
    this.filterTable.set(null);
    this.filterAction.set(null);
    this.filterActorType.set(null);
    this.searchText.set('');
    this.dateFrom.set(null);
    this.dateTo.set(null);
  }
  openChangedByInfo(data: any) {
    const { password, ...safeData } = data;
    this.changedByDialog.set(safeData);
  }

  closeChangedByDialog() {
    console.log('a');
    this.changedByDialog.set(null);
  }

  goToDetail(id: number) {
    this.router.navigate([`event/${id}`]);
  }
}
