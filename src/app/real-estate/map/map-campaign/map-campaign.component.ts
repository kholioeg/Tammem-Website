import { TranslateService } from '@ngx-translate/core';
import { MapCampaignService } from './../../../shared/services/map-campaign.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map-campaign',
  templateUrl: './map-campaign.component.html',
  styleUrls: ['./map-campaign.component.scss'],
})
export class MapCampaignComponent implements OnInit, OnDestroy {
  campaign: any;
  campaignSubscription: Subscription;
  direction = localStorage.getItem('direction');
  constructor(private mapCampaignService: MapCampaignService, public translate: TranslateService) {}

  ngOnInit(): void {
    this.campaignSubscription = this.mapCampaignService.campaign.subscribe((campaign) => {
      this.campaign = campaign;
    });
  }

  ngOnDestroy(): void {
    this.campaignSubscription.unsubscribe();
  }


}
