import { AuthComponent } from './../components/auth/auth.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AuthDialogService {

  constructor(private dialog: MatDialog) {}

  openLoginDialog(): void{
    this.dialog.open(AuthComponent, {
      width: '380px',
      position: { top: '50px' }
    });
  }

  closeLoginDialog(): void{
    this.dialog.closeAll();
  }
}
