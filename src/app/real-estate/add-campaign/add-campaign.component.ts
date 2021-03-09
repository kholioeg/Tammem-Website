import { Subscription } from 'rxjs';
import { CampaignsService } from 'src/app/shared/services/campaigns.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.scss'],
})
export class AddCampaignComponent implements OnInit, OnDestroy {
  step = 1;
  categories: any;
  direction = localStorage.getItem('direction');
  categoriesSubscription: Subscription;
  choosenGroup = false;
  campaign: any;
  campaignImages = [];
  campaignVideos = [];
  previewImages = [];
  previewVideos = [];

  items = [
    { name: 'living_rooms', value: 0 },
    { name: 'bedrooms', value: 0 },
    { name: 'rooms', value: 0 },
    { name: 'kitchens', value: 0 },
    { name: 'street_wide', value: 0, text: 'meter' },
    { name: 'building_age', value: 0, text: 'less_than_a_year' },
  ];

  boolItems = [
    { name: 'driver_room', value: false },
    { name: 'maid_room', value: false },
    { name: 'swimming_pool', value: false },
    { name: 'garden', value: false },
    { name: 'extension_room', value: false },
    { name: 'elevator', value: false },
    { name: 'air_conditioning', value: false },
  ];

  constructor(
    private router: Router,
    public translate: TranslateService,
    private campaignsService: CampaignsService
  ) {}

  ngOnInit(): void {
    this.getCategories('all');
  }

  // method to go to the next step in adding campaign
  next(): void {
    this.step++;
  }

  // method to return to home if client cancelled adding the campaign
  cancel(): void {
    this.router.navigate(['/home']);
  }

  // method to add campaign
  addCampaign(form): void {}

  getCategories(category): void {
    this.categoriesSubscription = this.campaignsService
      .getCampaignsCategories(category)
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  change(): void {
    console.log(this.boolItems);
  }
  // unsubscribe to categoriesSubscription
  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }

  selectImages(event): void {
    const files = event.target.files;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = (e: any) => {
        if (files[i].type.indexOf('image') > -1) {
          this.campaignImages.push(files[i]);
          this.previewImages.push(e.target.result);
        } else if (files[i].type.indexOf('video') > -1) {
          if (files[i].size / 100000 < 10) {
            this.campaignVideos.push(files[i]);
            this.previewVideos.push(e.target.result);
          } else {
            console.log('max size error');
          }
        }
      };
    }
  }

  remove(index, type): void {
    if (type === 'image') {
      this.previewImages.splice(index, 1);
      this.campaignImages.splice(index, 1);
    } else if (type === 'video') {
      this.previewVideos.splice(index, 1);
      this.campaignVideos.splice(index, 1);
    }
  }
}
