import { Campaign } from 'src/app/shared/models/campaign.model';
import { FilterDialogComponent } from './../filter-dialog/filter-dialog.component';
import { first } from 'rxjs/operators';
import { DialogService } from './../shared/services/dialog.service';
import { CampaignsService } from 'src/app/shared/services/campaigns.service';
import { Component, Input, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import localeAr from '@angular/common/locales/ar-EG';
registerLocaleData(localeAr);

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.scss'],
})
export class RealEstateComponent implements OnInit {
  constructor(
    private campaignService: CampaignsService,
    public router: Router,
    public translate: TranslateService,
    private dialog: DialogService
  ) {}

  campaigns: Campaign[];
  filteredCampaigns: any;
  direction = localStorage.getItem('direction');
  categories: Array<any>;
  category: any;
  titles: string;
  page: number;
  count: number;
  regions: Array<object>;
  region: any;
  @Input() specialCampaigns;

  ngOnInit(): void {
    this.campaignService
      .getFirstPage(this.specialCampaigns ? true : false)
      .then((listings) => {
        const campaigns = [];
        const dir = localStorage.getItem('direction');
        for (const campaign of listings.hits){
          if (dir === 'rtl'){
            campaign.category = campaign.search_data.category_ar;
          }

          if (dir === 'ltr'){
            campaign.category = campaign.search_data.category_en;
          }
          campaigns.push(campaign);
        }

        this.campaigns = campaigns;
        this.count = listings.nbHits;
      });
    this.campaignService
      .getAllCategories()
      .pipe(first())
      .subscribe((categories) => {
        this.categories = categories;
      });

    this.campaignService
      .getAllRegions()
      .pipe(first())
      .subscribe((regions) => {
        this.regions = regions;
      });

    this.campaignService.filteredCampaigns.subscribe((campaigns: any) => {
      if (campaigns) {
        this.filteredCampaigns = campaigns.hits;
        this.campaigns = campaigns.hits;
        this.count = campaigns.nbHits;
      }
    });
  }



  handlePageChange(event): any {
    if (!this.region && !this.category && !this.filteredCampaigns) {
      this.campaignService.getPage(event).then((listings) => {
        this.campaigns = listings.hits;
        this.page = listings.page;
        console.log('all');

      });
    } else if (this.region) {
      this.campaignService
        .getCampaignsByRegion(this.region.name_en, event)
        .then((result) => {
          this.campaigns = result.hits;
          console.log(result);
          console.log('region');


        });
    } else if (this.category) {
      this.campaignService
        .getCampaignsByCategory(this.category.code, event)
        .then((result) => {
          this.campaigns = result.hits;
        });
    } else if (this.filteredCampaigns) {
      console.log('dddd');

      this.campaignService
        .getFilteredCampaigns(
          JSON.parse(localStorage.getItem('filter')),
          false,
          event
        )
        .then((campaigns) => {
          this.count = campaigns.nbHits;
          this.campaignService.filteredCampaigns.next(campaigns);
          this.dialog.closeDialog();
        });
    }
    console.log(this.filteredCampaigns);

    this.page = event;
  }

  openFilterDialog(): void {
    this.dialog.openConfirmDialog(FilterDialogComponent, 'FilterDialogComponent');
  }

  selectCategory(category): void {
    this.category = category;
    this.campaignService
      .getCampaignsByCategory(category.code, 1)
      .then((result) => {
        this.campaigns = result.hits;
        this.count = result.nbHits;
      });
  }

  selectRegion(region): void {
    this.region = region;
    this.campaignService
      .getCampaignsByRegion(region.name_en, 1)
      .then((result) => {
        console.log(result);
        console.log('reg');

        this.campaigns = result.hits;
        this.count = result.nbHits;
      });
  }
}
