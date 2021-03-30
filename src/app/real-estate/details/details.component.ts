import { TranslateService } from '@ngx-translate/core';
import { CampaignsService } from 'src/app/shared/services/campaigns.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models/User.model';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { Subscription } from 'rxjs';
import localeAr from '@angular/common/locales/ar-EG';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeAr);

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  campaign: Campaign;
  currentImage: string;
  images: Array<any>;
  user: User;
  advertiser: any;
  subscriptions: Subscription[] = [];
  userRating = 0;
  direction = localStorage.getItem('direction');


  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignsService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.subscriptions[0] = this.campaignService.getUser().subscribe((user) => {
      this.user = user;
    });
    this.subscriptions[1] = this.campaignService.getCampaignById(id).subscribe((data) => {
      this.campaign = data;
      console.log(data);

      this.subscriptions[2] = this.campaignService.getAdveriser(data.advertiser_uid).subscribe((advertiser) => {
        this.advertiser = advertiser;
        this.userRating = advertiser.rating_as_advertiser;
      });

      this.subscriptions[3] = this.campaignService.getBuildingSide(data.more_details.building_side_code).subscribe(side => {
        if (this.direction === 'rtl'){
          this.campaign.more_details.building_side = side[0].name;
        } else {
          this.campaign.more_details.building_side = side[0].name_en;
        }
      });
    });
  }

  campaignChanged(campaign): void {
    this.campaign = campaign;
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions){
      subscription.unsubscribe();
    }
  }
}
