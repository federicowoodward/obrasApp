import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { Message } from 'primeng/message';
import { Note } from '../../models/interfaces.model';
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes() {
    const cached = localStorage.getItem('mock_notes');
    if (cached) {
      this.notes.set(JSON.parse(cached) as Note[]);
    } else {
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

    switch (note.title) {
      //esto probablemente esta mal
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
