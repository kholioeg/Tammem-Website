import { DialogService } from './../shared/services/dialog.service';
import { RealEstateService } from 'src/app/shared/services/real-estate.service';
import { Component, OnInit } from '@angular/core';
import { RealEstate } from '../shared/models/RealEstate.model';
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar-EG';
import { Router } from '@angular/router';
import { publish } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

registerLocaleData(localeAr);

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.scss'],
})
export class RealEstateComponent implements OnInit {
  constructor(
    private realEstateService: RealEstateService,
    private dialogService: DialogService,
    public router: Router,
    public translate: TranslateService,
    private dialog: DialogService
  ) {}

  campaigns: any[];
  titles: string;
  pageSize = 12;
  page: number;
  count: number;

  ngOnInit(): void {
    console.log(this.router.url);

    this.realEstateService.getFirstPage().subscribe((listings) => {
      this.campaigns = listings.hits;
      this.count = listings.nbHits;
      console.log(this.count);
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
          this.realEstateService.deleteRealEstate(id);
        }
      });
  }

  getDetails(id): void {
    this.router.navigate(['real-estate-details/', id]);
  }

  handlePageChange(event): any {
    this.realEstateService.getPage(event).subscribe((listings) => {
      console.log(listings.hits);

      this.campaigns = listings.hits;
      this.page = listings.page;
      console.log(this.page);
    });
  }
  openFilterDialog(): void {
    this.dialog.openConfirmDialog('FilterDialogComponent');
  }

}
