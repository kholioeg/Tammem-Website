import { first } from 'rxjs/operators';
import { DialogService } from './../shared/services/dialog.service';
import { CampaignsService } from 'src/app/shared/services/campaigns.service';
import { Component, OnInit } from '@angular/core';
import { RealEstate } from '../shared/models/RealEstate.model';
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar-EG';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
registerLocaleData(localeAr);

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.scss'],
})
export class RealEstateComponent implements OnInit {
  constructor(
    private campaignService: CampaignsService,
    private dialogService: DialogService,
    public router: Router,
    public translate: TranslateService,
    private dialog: DialogService
  ) {}

  campaigns: any[];
  direction = localStorage.getItem('direction');
  categories: Array<any>;
  category: any;
  titles: string;
  pageSize = 12;
  page: number;
  count: number;
  regions: Array<object>;
  region: any;

  ngOnInit(): void {
    this.campaignService.getFirstPage().subscribe((listings) => {
      console.log(listings);

      this.campaigns = listings.hits;
      this.count = listings.nbHits;
    });
    this.campaignService.getAllCategories().pipe(first()).subscribe((categories) => {
      this.categories = categories;
    });

    this.campaignService.getAllRegions().pipe(first()).subscribe(regions => {
      this.regions = regions;
    });
  }

  search(): any {
    if (this.titles !== '') {
      if (this.campaigns) {
        this.campaigns = this.campaigns.filter((res) => {
          return res.title
            .toLocaleLowerCase()
            .match(this.titles.toLocaleLowerCase());
        });
      }
    } else if (this.titles === '') {
      this.ngOnInit();
    }
  }

  onSearchClear(): void {
    this.titles = '';
    this.search();
  }

  onDelete(id): void {
    this.dialogService
      .openConfirmDialog('DeleteComponent')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.campaignService.deleteRealEstate(id);
        }
      });
  }

  getDetails(id): void {
    this.router.navigate(['real-estate-details/', id]);
  }

  handlePageChange(event): any {
    if (!this.region && !this.category){
      console.log('aaaalllllll');

      this.campaignService.getPage(event).subscribe((listings) => {
        this.campaigns = listings.hits;
        this.page = listings.page;
      });
    } else if (this.region){
      console.log('regioon');

      this.campaignService
      .getCampaignsByRegion(this.region.name_en, event)
      .then((result) => {
        this.campaigns = result.hits;
        // this.count = result.nbHits;
        this.page = event;
      });
    } else if (this.category){
      console.log('caaaaaaaaaaat');

      this.campaignService
      .getCampaignsByCategory(this.category.code, event)
      .then((result) => {
        this.campaigns = result.hits;
        // this.count = result.nbHits;
        this.page = event;
      });
    }

  }

  openFilterDialog(): void {
    this.dialog.openConfirmDialog('FilterDialogComponent');
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

  selectRegion(region): void{
    this.region = region;
    this.campaignService
    .getCampaignsByRegion(region.name_en, 1)
    .then((result) => {
      console.log(result);
      this.campaigns = result.hits;
      this.count = result.nbHits;
    });
  }
}
