import { Campaign } from 'src/app/shared/models/campaign.model';
import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CampaignsService } from 'src/app/shared/services/campaigns.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-related-campaigns',
  templateUrl: './related-campaigns.component.html',
  styleUrls: ['./related-campaigns.component.scss'],
})
export class RelatedCampaignsComponent implements OnChanges {
  @Input() campaign;
  @Output() campaignChanged = new EventEmitter();

  relatedCampaigns: any;
  tempCampaigns: Campaign[] = [];
  direction = localStorage.getItem('direction');

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    stagePadding: 70,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

  constructor(private campaignService: CampaignsService, private router: Router) {}

  ngOnChanges(): void {
    if (this.direction === 'rtl') {
      this.customOptions.rtl =  true;
    }
    if (this.campaign) {
      // this.relatedCampaigns.push(this.campaign);
      this.campaignService
        .getRelatedCampaigns(
          `${this.campaign.location_point.latitude}, ${this.campaign.location_point.longitude}`,
          5000,
          this.campaign.category_code,
          true
        )
        .then((relatedCampaigns) => {
          // console.log(relatedCampaigns);

          if (relatedCampaigns.nbHits < 31) {
            this.campaignService
              .getRelatedCampaigns(
                `${this.campaign.location_point.latitude}, ${this.campaign.location_point.longitude}`,
                5000,
                this.campaign.category_code,
                false
              )
              .then((anotherRelatedCampaigns) => {
                this.tempCampaigns = anotherRelatedCampaigns.hits;
                this.relatedCampaigns = this.tempCampaigns.filter((campaign) => {
                  return campaign.id !== this.campaign.id;
                });
              });
          } else {
            this.tempCampaigns = relatedCampaigns.hits;
            this.relatedCampaigns = this.tempCampaigns.filter((campaign) => {
              return campaign.id !== this.campaign.id;
            });
          }
        });
    }
  }
  getDetails(id): void {
    this.campaignService.getCampaignById(id).subscribe(campaign => {
      this.campaign = campaign;
      this.campaignChanged.emit(campaign);
    });
  }
}
