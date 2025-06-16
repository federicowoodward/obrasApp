import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import {
  Architect,
  Worker,
  Work,
  Element,
  Material,
  Note,
  Missing,
  Deposit,
} from '../models/interfaces.model';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  getArchitect(): Observable<Architect> {
    return of({
      name: 'fede',
      password: '1234',
      email: 'woodfederico@gmail.com',
      payment_level: 1,
      workers: [
        {
          name: 'Juan',
          password: '123',
          works_related: [1],
          notes_related: [1],
        },
      ],
      works: [
        {
          id: 1,
          title: 'Obra 1',
          desc: 'Descripción de la obra',
          date_created: '2025-06-16',
          workers_related: [0],
          elements_related: [0],
          materials_related: [0],
          missing_related: [0],
        },
        {
          id: 2,
          title: 'Obra 2',
          desc: 'Descripción de la obra',
          date_created: '2025-06-16',
          workers_related: [0],
          elements_related: [0],
          materials_related: [0],
          missing_related: [0],
        },
      ],
      deposit: {
        elements: [
          {
            name: 'Taladro',
            brand: 'Bosch',
            buy_date: '2024-01-10',
            photo: 'IMG',
            type: 'tool',
            notes_related: [2],
          },
        ],
        materials: [
          {
            name: 'Cemento',
            provider: 'Materiales S.A.',
            buy_date: '2024-02-20',
            notes_related: [],
          },
        ],
      },
      notes: [
        {
          title: 'Nota 1',
          text: 'ImportanteImportanteImportanteImportanteImportanteImportanteImportanteImportanteImportanteImportanteImportanteImportante',
          type: 'worker',
        },
        { title: 'Nota 2', text: 'Revisar', type: 'material' },
        { title: 'Nota 3', text: 'Cuidado', type: 'element' },
      ],
      missings: [{ title: 'Faltante 1', text: 'No llegó el cemento', work: 1 }],
    });
  }

  getWorks(): Observable<Work[]> {
    return this.getArchitect().pipe(map((architect) => architect.works));
  }

  getWorkers(): Observable<Worker[]> {
    return this.getArchitect().pipe(map((architect) => architect.workers));
  }

  getDeposit(): Observable<Deposit> {
    return this.getArchitect().pipe(map((architect) => architect.deposit));
  }

  getNotes(): Observable<Note[]> {
    return this.getArchitect().pipe(map((architect) => architect.notes));
  }

  getMissings(): Observable<Missing[]> {
    return this.getArchitect().pipe(map((architect) => architect.missings));
  }
}
