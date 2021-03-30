import { TranslateService } from '@ngx-translate/core';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CampaignsService } from 'src/app/shared/services/campaigns.service';

@Component({
  selector: 'app-district-details-dialog',
  templateUrl: './district-details-dialog.component.html',
  styleUrls: ['./district-details-dialog.component.scss'],
})
export class DistrictDetailsDialogComponent implements OnInit {
  direction = localStorage.getItem('direction');
  districtRating: any;
  averagePrices: Array<any> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public district,
    public translate: TranslateService,
    private campaignService: CampaignsService
  ) {}

  ngOnInit(): void {
    console.log(this.district);

    for (const [key, value] of Object.entries(
      this.district.properties_avg_rating
    )) {
      switch (Math.floor(Number(value))) {
        case 1:
          this.district[`${key}_color`] = '#EF442B';
          break;

        case 2:
          this.district[`${key}_color`] = '#FBA52F';
          break;

        case 3:
          this.district[`${key}_color`] = '#F8CB4E';
          break;

        case 4:
          this.district[`${key}_color`] = '#7AC04E';
          break;

        case 5:
          this.district[`${key}_color`] = '#1E457C';
          break;

        default:
          this.district[`${key}_color`] = 'transparent';
          break;
      }
    }

    this.campaignService
      .getDistrictRatings(this.district.id)
      .subscribe((ratings) => {
        this.districtRating = ratings;
      });

    this.campaignService
      .getAveragePrices(this.district.id)
      .subscribe((prices) => {
        console.log(prices);
        if (prices) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < prices.length; i++) {
          if (prices[i].id.split('_')[1] === '1') {
            prices[i].half = 'first_half';
            prices[i].year = prices[i].id.split('_')[0];
          }

          if (prices[i].id.split('_')[1] === '2') {
            prices[i].half = 'second_half';
            prices[i].year = prices[i].id.split('_')[0];
          }
        }

        prices[0].color = 'green';
        prices[0].icon = 'north';

        for (let i = 1; i < prices.length; i++){
          if (prices[i].average_meter_price < prices[i - 1].average_meter_price){
            prices[i].color = 'red';
            prices[i].icon = 'south';
          } else {
            prices[i].color = 'green';
            prices[i].icon = 'north';
          }
        }
        this.averagePrices = prices;
      }
      });
  }
}
