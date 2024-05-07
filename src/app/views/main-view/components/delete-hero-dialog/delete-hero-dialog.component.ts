import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-hero-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './delete-hero-dialog.component.html',
  styleUrl: './delete-hero-dialog.component.scss',
})
export class DeleteHeroDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteHeroDialogComponent>) {}

  closeDialog(value: boolean): void {
    this.dialogRef.close(value);
  }
}
