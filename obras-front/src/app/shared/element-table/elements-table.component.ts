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
import { AuthService } from '../../services/auth.service';
import { IftaLabel } from 'primeng/iftalabel';
import { Router } from '@angular/router';
import { ElementsService } from '../../services/elements.service';

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
  private elementsSvc = inject(ElementsService);
  private fb = inject(FormBuilder);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  public router = inject(Router);

  architect = this.authService.user();

  elements = this.elementsSvc.elements;

  categories = signal<{ id: number; name: string }[]>([]);
  locations = signal<{ id: number; name: string; type: string }[]>([]);

  expandedRowKeys: { [key: string]: boolean } = {};
  displayDialog = signal(false);
  isNew = signal(false);
  selectedElementId: number | null = null;
  selectedCategoryId = signal<number | null>(null);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    provider: ['', Validators.required],
    buyDate: ['', Validators.required],
    categoryId: [null, Validators.required],
    locationId: [null, Validators.required],
    locationType: ['', Validators.required],
  });

  ngOnInit() {
    if (!this.architect?.id) return;
    this.elementsSvc.ensureLoaded(this.architect.id).subscribe({
      next: (res) => {
        // derivar categorías desde los elementos cargados
        const uniqueCats = new Map<number, { id: number; name: string }>();
        res.forEach((el: any) => {
          const c = el?.category;
          if (c?.id && !uniqueCats.has(c.id))
            uniqueCats.set(c.id, { id: c.id, name: c.name });
        });
        this.categories.set(Array.from(uniqueCats.values()));
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

  // --- Fila expandida (sin noteId$Map) ---
  onRowExpand(event: { data: Element }) {
    if (event?.data?.id != null) {
      this.expandedRowKeys = { ...this.expandedRowKeys, [event.data.id]: true };
    }
  }

  onRowCollapse(event: { data: Element }) {
    if (event?.data?.id != null) {
      const { [event.data.id]: _, ...rest } = this.expandedRowKeys;
      this.expandedRowKeys = rest;
    }
  }

  // --- Dialogs ---
  openAddDialog() {
    this.form.reset();
    if (this.locations().length > 0) {
      const first = this.locations()[0];
      this.form.get('locationId')?.setValue(first.id);
      this.form.get('locationType')?.setValue(first.type);
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
      categoryId: (element as any).category?.id ?? null,
      locationId: (element as any).location?.locationId ?? null,
      locationType: (element as any).location?.locationType ?? '',
    });
    this.displayDialog.set(true);
    this.isNew.set(false);
    this.selectedElementId = element.id;
  }

  cancelDialog() {
    this.displayDialog.set(false);
    this.form.reset();
    this.selectedElementId = null;
  }

  // --- Guardar / Eliminar (CRUD) ---
  saveElement() {
    if (this.form.invalid || !this.architect?.id) return;

    let data = { ...this.form.value };
    if (data.buyDate instanceof Date) {
      data.buyDate = data.buyDate.toISOString().substring(0, 10);
    }

    const afterSuccess = (summary: string) => {
      this.displayDialog.set(false);
      this.form.reset();
      this.messageService.add({ severity: 'success', summary, life: 2000 });
    };

    if (this.isNew()) {
      this.elementsSvc.create(this.architect.id, data).subscribe({
        next: () => afterSuccess('Elemento creado'),
        error: () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear el elemento',
            life: 2000,
          }),
      });
    } else if (this.selectedElementId != null) {
      this.elementsSvc
        .update(this.architect.id, this.selectedElementId, data)
        .subscribe({
          next: () => afterSuccess('Elemento actualizado'),
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
    if (!this.architect?.id) return;
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Seguro que deseas borrar este elemento?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: { label: 'Borrar', severity: 'danger' },
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      accept: () => {
        this.elementsSvc.delete(this.architect!.id, elementId).subscribe({
          next: () => {
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

  // --- Helpers UI (se mantienen) ---
  filteredElements() {
    const cat = this.selectedCategoryId();
    if (!cat) return this.elements();
    return this.elements().filter((el) => (el as any).category?.id === cat);
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

  editNote(noteId: number) {
    console.log('note-editor', noteId);
    this.router.navigate(['note-editor', noteId], {
      queryParams: { from: this.router.url },
    });
  }

  createNoteForElement(elementId: number) {
    // Usamos el mismo route param :id pero marcamos que es "alta" con query param.
    // Así el NoteEditor sabe que ese id corresponde a un ELEMENTO y no a una nota aún.
    this.router.navigate(['note-editor', elementId], {
      queryParams: { from: this.router.url, mode: 'create', elementId },
    });
  }
}
