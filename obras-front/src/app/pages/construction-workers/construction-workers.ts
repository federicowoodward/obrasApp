import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { ApiService } from '../../core/http/api';
import { ConstructionWorker } from '../../models/interfaces.model';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-construction-workers',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    ButtonModule,
    ConfirmPopupModule,
    ToastModule,
  ],
  templateUrl: './construction-workers.html',
  styleUrl: './construction-workers.scss',
  providers: [ConfirmationService, MessageService],
})
export class ConstructionWorkers {
  private authService = inject(AuthService);
  architect = this.authService.user();
  workers = signal<ConstructionWorker[]>([]);

  constructor(
    private api: ApiService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.fetchWorkers();
  }

  fetchWorkers() {
    this.api
      .request('GET', `architect/${this.architect?.id}/construction-worker`)
      .subscribe((res) => {
        this.workers.set(res as ConstructionWorker[]);
      });
  }

  createWorker(form: any) {
    if (form.invalid) return;
    const data = form.value;
    this.api
      .request(
        'POST',
        `architect/${this.architect?.id}/construction-worker`,
        data
      )
      .subscribe({
        next: () => {
          form.resetForm();
          this.fetchWorkers();
        },
        error: () => alert('Error al crear obrero'),
      });
  }

  updateWorker(event: any) {
    const worker = event.data;
    this.api
      .request(
        'PUT',
        `architect/${this.architect?.id}/construction-worker/${worker.id}`,
        worker
      )
      .subscribe({
        next: () => this.fetchWorkers(),
        error: () => alert('Error al editar obrero'),
      });
  }

  deleteWorker(workerId: number) {
    if (!confirm('¿Seguro que deseas borrar este obrero?')) return;
    this.api
      .request(
        'DELETE',
        `architect/${this.architect?.id}/construction-worker/${workerId}`
      )
      .subscribe({
        next: () => this.fetchWorkers(),
        error: () => alert('Error al borrar obrero'),
      });
  }

  confirmDeleteWorker(event: Event, workerId: number) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Seguro que deseas borrar este obrero?',
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
            `architect/${this.architect?.id}/construction-worker/${workerId}`
          )
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Eliminado',
                detail: 'Obrero borrado correctamente',
                life: 2500,
              });
              this.fetchWorkers();
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo borrar el obrero',
                life: 2500,
              });
            },
          });
      },
    });
  }

  cancelEditWorker(event: any) {
    this.fetchWorkers(); // Para volver a estado original
  }
}
