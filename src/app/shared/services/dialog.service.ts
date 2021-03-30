import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog(data, component, payload?): any {
    if (component === 'OrderDialogComponent') {
      return this.dialog.open(data, {
        width: '420px',
        panelClass: 'order-dialog',
        position: { top: '80px' },
      });
    } else if (component === 'FilterDialogComponent') {
      const direction = localStorage.getItem('direction');
      if (direction === 'rtl') {
        return this.dialog.open(data, {
          width: '420px',
          height: '100%',
          panelClass: 'filter_dialog',
          position: { top: '0px', left: '0px' },
        });
      } else {
        return this.dialog.open(data, {
          width: '420px',
          height: '100%',
          panelClass: 'filter_dialog',
          position: { top: '0px', right: '0px' },
        });
      }
    } else if (component === 'DistrictDetailsDialogComponent') {
      return this.dialog.open(data, {
        width: '400px',
        height: '100%',
        panelClass: 'district_details_dialog',
        position: { top: '0px', left: '0px' },
        data: payload
      });
    }
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
