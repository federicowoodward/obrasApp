import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Editor } from 'primeng/editor';

@Component({
  selector: 'note-edit-dialog',
  standalone: true,
  imports: [FormsModule, DialogModule, ButtonModule, InputTextModule, Editor],
  template: `
    <p-dialog
      [(visible)]="visible"
      [modal]="true"
      [closable]="true"
      header="{{ note?.id ? 'Editar nota' : 'Nueva nota' }}"
      (onHide)="onCancel()"
      [style]="{ width: '80%' }"
    >
      <form
        (ngSubmit)="submit()"
        #noteForm="ngForm"
        class="flex flex-column gap-3"
      >
        <input
          pInputText
          name="title"
          [(ngModel)]="form.title"
          placeholder="Título"
          required
          [ngModelOptions]="{ standalone: true }"
        />
        <p-editor
          [(ngModel)]="form.text"
          [style]="{ height: '80%' }"
          name="text"
          required
        />
        <div class="flex gap-2 justify-end">
          <button
            pButton
            type="button"
            severity="secondary"
            (click)="onCancel()"
            label="Cancelar"
          ></button>
          <button
            pButton
            type="submit"
            severity="primary"
            label="Guardar"
            [disabled]="!form.title || !form.text"
          ></button>
        </div>
      </form>
    </p-dialog>
  `,
})
export class NoteEditDialog {
  @Input() visible: boolean = false;
  @Input() note: { title: string; text: string; id?: number } | null = null;

  @Output() save = new EventEmitter<{
    title: string;
    text: string;
    id?: number;
  }>();
  @Output() cancel = new EventEmitter<void>();

  form = { title: '', text: '' };

  ngOnChanges() {
    if (this.note) this.form = { title: this.note.title, text: this.note.text };
    else this.form = { title: '', text: '' };
  }

  submit() {
    if (!this.form.title || !this.form.text) return;
    // this.save.emit({ ...this.form, id: this.note?.id });
    console.log(this.form);
    this.visible = false;
  }

  onCancel() {
    this.visible = false;
    this.cancel.emit();
  }
}
