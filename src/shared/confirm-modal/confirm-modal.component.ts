import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{ title }}</h4>
    </div>
    <div class="modal-body">
      {{ message }}
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="decline()">Cancelar</button>
      <button type="button" class="btn btn-primary" (click)="confirm()">Confirmar</button>
    </div>
  `
})
export class ConfirmModalComponent {
  @Input() title?: string;
  @Input() message?: string;
  @Input() onClose!: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) {}

  confirm(): void {
    this.onClose.next(true);
    this.onClose.complete();
    this.bsModalRef.hide();
  }

  decline(): void {
    this.onClose.next(false);
    this.onClose.complete();
    this.bsModalRef.hide();
  }
}