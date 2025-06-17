import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './work.html',
  styleUrls: ['./work.scss'],
})
export class Work {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  id: string | null = null;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID:', this.id);
  }

  goBack() {
    this.router.navigate(['/works']);
  }
}