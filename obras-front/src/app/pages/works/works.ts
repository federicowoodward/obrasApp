import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-works',
  imports: [CardModule, Button],
  templateUrl: './works.html',
  styleUrl: './works.scss'
})
export class Works {
  constructor(private router: Router) {}

  goToWork(id: string) {
    this.router.navigate(['/work', id]);
  }
}
