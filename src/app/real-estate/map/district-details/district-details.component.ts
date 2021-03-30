import { CampaignsService } from 'src/app/shared/services/campaigns.service';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DistrictDetailsDialogComponent } from '../district-details-dialog/district-details-dialog.component';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-district-details',
  templateUrl: './district-details.component.html',
  styleUrls: ['./district-details.component.scss'],
})
export class DistrictDetailsComponent implements OnChanges {
  @Input() district;
  @Input() campaignsCount;
  @Input() totalCampaignsCount;
  districtFromDb: any;

  constructor(
    private campaignsService: CampaignsService,
    private dialog: DialogService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.district) {
      this.campaignsService
        .getDistrict(
          changes.district.currentValue,
          localStorage.getItem('direction')
        )
        .subscribe((data) => {
          if (data.length) {
            this.districtFromDb = {
              id: data[0].payload.doc.id,
              ...data[0].payload.doc.data(),
            };
          }
        });
    }
  }

  getDistrictDetails(value): void {
    this.districtFromDb.value = value;
    this.dialog.openConfirmDialog(
      DistrictDetailsDialogComponent,
      'DistrictDetailsDialogComponent',
      this.districtFromDb
    );
  }
}
