import { Component, inject, Inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/http/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Construction } from '../../models/interfaces.model';
import { CommonModule } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-constructions',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    ToastModule,
    ConfirmPopupModule,
    CommonModule,
    InputText,
    ReactiveFormsModule,
  ],
  templateUrl: './construction.html',
  styleUrl: './construction.scss',
  providers: [ConfirmationService, MessageService],
})
export class ConstructionComponent {
  private authService = inject(AuthService);
  works = signal<Construction[]>([]);
  formGroup: FormGroup;
  architect = this.authService.user(); // reemplazar por auth real

  constructor(
    private api: ApiService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchWorks();
  }

  fetchWorks() {
    this.api
      .request('GET', `architect/${this.architect?.id}/construction`)
      .subscribe((res) => this.works.set(res as Construction[]));
    console.log(this.works());
  }

  createWork() {
    if (this.formGroup.invalid) return;
    this.api
      .request(
        'POST',
        `architect/${this.architect?.id}/construction`,
        this.formGroup.value
      )
      .subscribe({
        next: () => {
          this.formGroup.reset();
          this.fetchWorks();
          this.messageService.add({
            severity: 'success',
            summary: 'Obra creada',
            detail: 'La obra fue creada correctamente',
            life: 2500,
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear la obra',
            life: 2500,
          });
        },
      });
  }

  confirmDeleteWork(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Seguro que deseas borrar esta obra?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: { label: 'Borrar', severity: 'danger' },
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      accept: () => {
        this.api
          .request(
            'DELETE',
            `architect/${this.architect?.id}/construction/${id}`
          )
          .subscribe({
            next: () => {
              this.fetchWorks();
              this.messageService.add({
                severity: 'success',
                summary: 'Obra eliminada',
                detail: 'La obra fue eliminada correctamente',
                life: 2500,
              });
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo borrar la obra',
                life: 2500,
              });
            },
          });
      },
    });
  }

  goToWork(id: string | number) {
    this.router.navigate(['/construction', id]);
  }
}
