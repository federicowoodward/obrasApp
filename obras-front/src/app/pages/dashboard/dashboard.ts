import { Component, OnInit } from '@angular/core';
import { Card } from 'primeng/card';
import { ApiService } from '../../core/http/api';

@Component({
  selector: 'app-dashboard',
  imports: [Card],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  constructor(private api: ApiService) {}
  dato: any = [];

  ngOnInit() {
    this.api.request('GET', 'category').subscribe((res) => (this.dato = res));
  }
}
