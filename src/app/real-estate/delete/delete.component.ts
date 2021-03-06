import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<DeleteComponent>) {}

  ngOnInit(): void {}

  closeDialog(): void {
    console.log('ddd');

    this.dialogRef.close();
  }
}
