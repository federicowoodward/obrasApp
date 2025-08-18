import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Construction } from '../../models/interfaces.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-construction-detail',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, ToastModule],
  templateUrl: './construction-detail.html',
  styleUrls: ['./construction-detail.scss'],
  providers: [MessageService],
})
export class ConstructionDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(ApiService);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  architect = this.authService.user();

  id: string | null = null;
  construction: Construction | null = null;
  loading = false;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.fetchWork();
    }
  }

  fetchWork() {
    this.loading = true;
    this.api
      .request('GET', `architect/${this.architect?.id}/construction`)
      .subscribe({
        next: (res) => {
          const AllConstruction = res as any[];
          this.construction = AllConstruction.find(
            (work) => work.id == this.id
          );
          this.loading = false;
          if (!this.construction) {
            this.messageService.add({
              severity: 'warn',
              summary: 'No encontrada',
              detail: 'No existe esa obra',
              life: 2500,
            });
          }
        },
        error: () => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo obtener la obra',
            life: 2500,
          });
        },
      });
  }

  goBack() {
    this.router.navigate(['/constructions']);
  }
}
