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
        width: '420px',
        panelClass: 'order-dialog',
        position: { top: '80px' },
      });
    } else if (component === 'DeleteComponent') {
      return this.dialog.open(DeleteComponent, {
        width: '350px',
        panelClass: 'delete',
      });
    } else if (component === 'FilterDialogComponent') {
      const direction = localStorage.getItem('direction');
      if (direction === 'rtl') {
        return this.dialog.open(FilterDialogComponent, {
          width: '420px',
          height: '100%',
          panelClass: 'filter_dialog',
          position: { top: '0px', left: '0px' },
        });
      } else {
        return this.dialog.open(FilterDialogComponent, {
          width: '420px',
          height: '100%',
          panelClass: 'filter_dialog',
          position: { top: '0px', right: '0px' },
        });
      }
    }
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
