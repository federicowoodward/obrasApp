import { Component, OnInit, inject, signal } from '@angular/core';
import { Card } from 'primeng/card';
import { ApiService } from '../../core/api';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Card, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private api = inject(ApiService);
  private auth = inject(AuthService);

  data = signal<{
    counts?: {
      constructions: number;
      workers: number;
      deposits: number;
      elements: number;
      notes: number;
      missings: number;
    };
    last5Moves?: Array<{
      id: number;
      elementId: number;
      when: string;
      actorId: number | null;
      actorType: string | null;
      from: any;
      to: any;
    }>;
  }>({});

  ngOnInit() {
    const user = this.auth.user();
    if (!user) return;

    this.api
      .request('GET', `architect/${user.id}/stadistics`)
      .subscribe((res) => this.data.set(res as any));
  }
}
