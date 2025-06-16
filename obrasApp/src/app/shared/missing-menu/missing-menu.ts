import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { Message } from 'primeng/message';
import { Note } from '../../models/interfaces.model';
import { MockDataService } from '../../services/mock-data.service';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-missing-menu',
  standalone: true,
  imports: [DrawerModule, ButtonModule, Message, CommonModule],
  templateUrl: './missing-menu.html',
  styleUrl: './missing-menu.scss',
})
export class MissingMenu implements OnInit {
  visible = false;
  notes = signal<Note[]>([]);
  animButton = true;

  constructor(private mockData: MockDataService, private router: Router) {}

  ngOnInit(): void {
    this.loadNotes();
    setTimeout(() => {
      this.animButton = false;
    }, 4000); // Titila por 3 segundos
  }

  loadNotes() {
    const cached = localStorage.getItem('mock_notes');
    if (cached) {
      this.notes.set(JSON.parse(cached) as Note[]);
    } else {
      this.mockData.getNotes().subscribe((notes) => {
        this.notes.set(notes);
        localStorage.setItem('mock_notes', JSON.stringify(notes));
      });
    }
  }

  openDrawer() {
    this.animButton = false;
    this.loadNotes();
    this.visible = true;
  }

  goTo(note: Note) {
    let route = '';
    let fragment = '';

    switch (note.type) {
      case 'worker':
        route = '/workers';
        break;
      case 'material':
        route = '/deposit';
        break;
      case 'element':
        route = '/deposit';
        break;
    }

    this.router.navigate([route], {
      fragment: fragment || undefined,
    });
  }
}
