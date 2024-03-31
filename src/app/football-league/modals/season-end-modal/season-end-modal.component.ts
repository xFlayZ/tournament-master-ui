import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-season-end-modal',
  templateUrl: './season-end-modal.component.html',
  styleUrl: './season-end-modal.component.css'
})
export class SeasonEndModalComponent {

  constructor(public dialogRef: MatDialogRef<SeasonEndModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
