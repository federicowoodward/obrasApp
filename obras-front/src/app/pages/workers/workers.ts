import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Work, Worker } from '../../models/interfaces.model';
import { MockDataService } from '../../services/mock-data.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-workers',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
  ],
  templateUrl: './workers.html',
  styleUrl: './workers.scss',
})
export class Workers {
  workers = signal<Worker[]>([]);
  work = signal<Work[]>([]);
  formGroup!: FormGroup;

  constructor(private mockData: MockDataService) {}

  ngOnInit() {
    this.mockData.getWorkers().subscribe((workers) => {
      this.workers.set(workers);
    });
    this.mockData.getWorks().subscribe((works) => {
      this.work.set(works);
    });
  }
}
