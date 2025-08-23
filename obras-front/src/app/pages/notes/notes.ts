import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { NotesService } from '../../services/notes.service';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { ElementsService } from '../../services/elements.service';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ToastModule,
    ConfirmPopupModule,
    EditorModule,
    FormsModule,
  ],
  templateUrl: './notes.html',
  styleUrl: './notes.scss',
  providers: [MessageService, ConfirmationService],
})
export class Notes implements OnInit {
  private notesSvc = inject(NotesService);
  private elementsSvc = inject(ElementsService);
  private messageService = inject(MessageService);
  public router = inject(Router);
  private authService = inject(AuthService);
  private sanitizer = inject(DomSanitizer);
  architect = this.authService.user();

  notes = this.notesSvc.notes; // señal compartida

  ngOnInit() {
    if (!this.architect?.id) return;
    this.elementsSvc.init(this.architect.id).subscribe({
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los elementos',
          life: 2500,
        }),
    });
  }

  goToEditor(id: number) {
    this.router.navigate(['note-editor', id]);
  }


renderNoteHtml(text?: string): SafeHtml {
  const html = text || '';
  const clean = DOMPurify.sanitize(html);
  return this.sanitizer.bypassSecurityTrustHtml(clean);
}
}
