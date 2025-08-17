import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { Element } from '../../models/interfaces.model';
import { ApiService } from '../../core/http/api';
import { AuthService } from '../../services/auth.service';
import { IftaLabel } from 'primeng/iftalabel';
import { NotesService } from '../../services/notes.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/internal/operators/take';
import { shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-elements-table',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ConfirmPopupModule,
    ToastModule,
    DialogModule,
    IftaLabel,
  ],
  templateUrl: './elements-table.component.html',
  styleUrl: './elements-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ElementsTableComponent {
  private authService = inject(AuthService);
  public notesSvc = inject(NotesService);
  public router = inject(Router);
  architect = this.authService.user();
  elements = signal<Element[]>([]);
  expandedRowKeys: { [key: string]: boolean } = {};
  private noteId$Map = new Map<number, Observable<number | null>>();

  onRowExpand(event: { data: Element }) {
    if (event?.data?.id != null) {
      this.expandedRowKeys = { ...this.expandedRowKeys, [event.data.id]: true };
    }
  }

  noteId$(elementId: number): Observable<number | null> {
    if (!this.noteId$Map.has(elementId)) {
      const obs = this.notesSvc
        .noteIdForElement(elementId)
        .pipe(shareReplay(1));
      this.noteId$Map.set(elementId, obs);
    }
    return this.noteId$Map.get(elementId)!;
  }

  onRowCollapse(event: { data: Element }) {
    if (event?.data?.id != null) {
      const { [event.data.id]: _, ...rest } = this.expandedRowKeys;
      this.expandedRowKeys = rest;
      this.noteId$Map.delete(event.data.id);
    }
  }
  categories = signal<{ id: number; name: string }[]>([]);
  locations = signal<{ id: number; name: string; type: string }[]>([]);

  form: FormGroup;
  displayDialog = signal(false);
  isNew = signal(false);
  selectedElementId: number | null = null;
  selectedCategoryId = signal<number | null>(null);

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      provider: ['', Validators.required],
      buyDate: ['', Validators.required],
      categoryId: [null, Validators.required],
      locationId: [null, Validators.required],
      locationType: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchElements();
    this.fetchCategories();
    this.fetchLocations();
  }

  fetchElements() {
    this.api
      .request('GET', `architect/${this.architect?.id}/element`)
      .subscribe({
        next: (res) => {
          this.elements.set(res as Element[]);
        },
        error: () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar los elementos',
            life: 2500,
          }),
      });
  }

  fetchCategories() {
    this.api.request('GET', `category`).subscribe({
      next: (res) => this.categories.set(res as any[]),
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las categorías',
          life: 2500,
        }),
    });
  }

  fetchLocations() {
    this.api
      .request<{ id: number; name: string }[]>(
        'GET',
        `architect/${this.architect?.id}/deposit`
      )
      .subscribe({
        next: (res) => {
          const resFormatted = res.map((item) => ({
            id: item.id,
            name: item.name,
            type: 'deposit',
          }));
          this.locations.set([...this.locations(), ...resFormatted]);
        },
        error: () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar los depósitos',
            life: 2500,
          }),
      });
    this.api
      .request<{ id: number; description: string; title: string }[]>(
        'GET',
        `architect/${this.architect?.id}/construction`
      )
      .subscribe({
        next: (res) => {
          const resFormatted = res.map((item) => ({
            id: item.id,
            name: item.title,
            type: 'construction',
          }));
          this.locations.set([...this.locations(), ...resFormatted]);
        },
        error: () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar los depósitos',
            life: 2500,
          }),
      });
  }

  openAddDialog() {
    this.form.reset();
    // Si tenés depósitos cargados, seleccioná el primero por defecto
    if (this.locations().length > 0) {
      this.form.get('locationId')?.setValue(this.locations()[0].id);
      this.form.get('locationType')?.setValue(this.locations()[0].type);
    }
    this.displayDialog.set(true);
    this.isNew.set(true);
    this.selectedElementId = null;
  }

  openEditDialog(element: Element) {
    this.form.patchValue({
      name: element.name,
      brand: element.brand,
      provider: element.provider,
      buyDate: element.buyDate?.substring(0, 10),
      categoryId: element.category?.id ?? null,
      locationId: element.location?.locationId ?? null,
      locationType: element.location?.locationType ?? '',
    });
    this.displayDialog.set(true);
    this.isNew.set(false);
    this.selectedElementId = element.id;
  }

  saveElement() {
    if (this.form.invalid) return;
    let data = { ...this.form.value };
    if (data.buyDate instanceof Date) {
      data.buyDate = data.buyDate.toISOString().substring(0, 10);
    }
    if (this.isNew()) {
      this.api
        .request('POST', `architect/${this.architect?.id}/element`, data)
        .subscribe({
          next: () => {
            this.fetchElements();
            this.displayDialog.set(false);
            this.form.reset();
            this.messageService.add({
              severity: 'success',
              summary: 'Elemento creado',
              life: 2000,
            });
          },
          error: () =>
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo crear el elemento',
              life: 2000,
            }),
        });
    } else {
      this.api
        .request(
          'PUT',
          `architect/${this.architect?.id}/element/${this.selectedElementId}`,
          data
        )
        .subscribe({
          next: () => {
            this.fetchElements();
            this.displayDialog.set(false);
            this.form.reset();
            this.messageService.add({
              severity: 'success',
              summary: 'Elemento actualizado',
              life: 2000,
            });
          },
          error: () =>
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo actualizar el elemento',
              life: 2000,
            }),
        });
    }
  }

  confirmDeleteElement(event: Event, elementId: number) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Seguro que deseas borrar este elemento?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        label: 'Borrar',
        severity: 'danger',
      },
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      accept: () => {
        this.api
          .request(
            'DELETE',
            `architect/${this.architect?.id}/element/${elementId}`
          )
          .subscribe({
            next: () => {
              this.fetchElements();
              this.messageService.add({
                severity: 'success',
                summary: 'Elemento eliminado',
                life: 2000,
              });
            },
            error: () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar el elemento',
                life: 2000,
              }),
          });
      },
    });
  }

  cancelDialog() {
    this.displayDialog.set(false);
    this.form.reset();
    this.selectedElementId = null;
  }
  filteredElements() {
    const cat = this.selectedCategoryId();
    if (!cat) return this.elements();
    return this.elements().filter((el) => el.category?.id === cat);
  }

  onCategoryChange(event: any) {
    const value = +event.target.value;
    this.selectedCategoryId.set(value === 0 ? null : value);
  }

  onGlobalFilter(event: Event, dt: any) {
    const value = (event.target as HTMLInputElement).value;
    dt.filterGlobal(value, 'contains');
  }

  onLocationChange(event: any) {
    const selectedId = +event.target.value;
    const loc = this.locations().find((l) => l.id === selectedId);
    if (loc) {
      this.form.get('locationType')?.setValue(loc.type);
      this.form.get('locationId')?.setValue(loc.id);
    }
  }

  getLocationName(id?: number, type?: string): string {
    if (!id || !type) return '-';
    const found = this.locations().find((l) => l.id === id && l.type === type);
    return found ? found.name : '-';
  }

  openExisting(elementId: number) {
    this.notesSvc
      .getByElement(elementId)
      .pipe(take(1))
      .subscribe((note) => {
        if (note) {
          this.notesSvc.openEditorById(note.id, this.router.url);
        }
      });
  }
}
