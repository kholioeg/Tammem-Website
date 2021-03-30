import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CampaignsService } from '../shared/services/campaigns.service';
import { first, skip } from 'rxjs/operators';
import { DialogService } from '../shared/services/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent implements OnInit {
  direction = localStorage.getItem('direction');
  @ViewChild('form', { static: true }) ngForm: NgForm;
  formChangesSubscription: Subscription;
  categories: Array<any>;
  selectedCategory: any;
  selected: string;
  type: string;
  rentalType: string;
  ownerShip: string;
  dateFrom: Date;
  count: number;
  url: string;

  constructor(
    public translate: TranslateService,
    private campaignService: CampaignsService,
    private dialog: DialogService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.url = this.router.url;

    this.campaignService
      .getAllCategories()
      .pipe(first())
      .subscribe((categories) => {
        this.categories = categories;
      });

    this.formChangesSubscription = this.ngForm.form.valueChanges
      .pipe(skip(10))
      .subscribe((data) => {
        this.campaignService
          .getFilteredCampaigns(data, true)
          .then((campaigns) => {
            console.log(campaigns);
            this.count = campaigns.nbHits;
          });
      });
  }

  submit(form): void {
    localStorage.setItem('filter', JSON.stringify(form.value));
    this.campaignService
      .getFilteredCampaigns(form.value, false, 1)
      .then((campaigns) => {
        this.count = campaigns.hits.length;
        this.campaignService.filteredCampaigns.next(campaigns);
        this.dialog.closeDialog();
      });
  }
}
