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

  ngOnInit() {
    this.api.request('GET', 'category').subscribe((res) => console.log(res));

    // this.api
    //   .request('POST', 'users', { name: 'Juan' })
    //   .subscribe((res) => console.log(res));
  }
}
