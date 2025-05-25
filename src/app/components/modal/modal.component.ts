import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalSucesso } from 'src/app/interfaces/modalSucesso.interface';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalSucesso,
    public dialogRef: MatDialogRef<ModalComponent>
  ) {}

  closeModal() {
    this.dialogRef.close();
  }
}
