import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { NotesService } from '../../services/notes.service';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ToastModule,
    ConfirmPopupModule,
  ],
  templateUrl: './notes.html',
  styleUrl: './notes.scss',
  providers: [MessageService, ConfirmationService],
})
export class Notes implements OnInit{
  private notesSvc = inject(NotesService);
  public router = inject(Router);
  
  notes = this.notesSvc.notes; // señal compartida
  
  ngOnInit() {
    console.log(this.notes())
  }

  goToEditor(id: number) {
    this.router.navigate(['note-editor', id]);
  }
}
