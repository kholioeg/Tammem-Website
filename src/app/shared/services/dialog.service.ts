import { OrderDialogComponent } from './../../order-dialog/order-dialog.component';
import { DeleteComponent } from './../../real-estate/delete/delete.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from 'src/app/filter-dialog/filter-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog(component): any {
    if (component === 'OrderDialogComponent') {
      return this.dialog.open(OrderDialogComponent, {
        width: '450px',
        panelClass: 'order-dialog',
        position: { top: '200px'}
      });
    } else if (component === 'DeleteComponent') {
      return this.dialog.open(DeleteComponent, {
        width: '350px',
        panelClass: 'delete',
      });
    } else if (component === 'FilterDialogComponent') {
      return this.dialog.open(FilterDialogComponent, {
        width: '350px',
        height: '100%',
        panelClass: 'filter_dialog',
        position: { top: '0px', left: '0px'}
      });
    }
  }

}
