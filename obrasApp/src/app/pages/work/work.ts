import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [],
  templateUrl: './work.html',
})
export class Work {
  private route = inject(ActivatedRoute);
  id: string | null = null;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID:', this.id);
  }
}
