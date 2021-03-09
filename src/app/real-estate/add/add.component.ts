import { AuthService } from './../../shared/services/auth.service';
import { OptionsService } from './../../shared/services/options.service';
import { Component, OnInit } from '@angular/core';
import { CampaignsService } from 'src/app/shared/services/campaigns.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  options = new Set([]);
  optionsFromService: string[];
  form = this.campaignService.form;
  imagesFiles: any[] = [];

  userId;
  location;
  optionsArray = [];
  urls = [];
  constructor(
    private campaignService: CampaignsService,
    private optionsService: OptionsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.form.reset();
    this.userId = this.authService.userId;
    this.optionsService.getAllOptions().subscribe((data) => {
      this.optionsFromService = data;
    });
  }

  onSubmit(form): void {
    console.log(form.value.location);
    const record = {
      advertiser_uid: this.userId,
      campaign_number: null,
      campaign_ownership: 'intermediary',
      campaign_status: 'published',
      campaign_type: 'special',
      category_code: 'cat_1',
      date_time: new Date(),
      title: form.value.title,
      price: form.value.price,
      description: form.value.description,
      area: form.value.area,
      is_active: false,
      last_edit_date_time: null,
      location_name: null,
      options: this.optionsArray,
      location: this.location,
      more_details: {
        bedrooms: form.value.bedrooms,
        interface: form.value.interface,
        lounges: form.value.lounges,
        bathrooms: form.value.bathrooms,
        streetwidth : form.value.streetwidth,
        building_age: form.value.building_age
      },
    };
    this.campaignService.addNewRealEstate(record, this.imagesFiles);
    form.reset();
  }

  pushOptions(event): void {
    if (event.checked) {
      const value = event.source.value;
      // value.split('');
      // console.log(value);
      this.options.add(value);
    }

    if (!event.checked) {
      this.options.delete(event.source.value);
    }

    this.optionsArray.push(this.options);
  }

  onSelectImage(event): void {
    this.imagesFiles = [...event.target.files];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      reader.onload = (e: any) => {
        this.urls.push(e.target.result);
      };
    }
  }

  remove(e, url): void {
    const index = this.urls.findIndex((ur) => {
      return ur === url;
    });
    this.urls.splice(index, 1);
    this.imagesFiles.splice(index, 1);
  }

  getLocation($event): any {
    this.location = $event;
  }
}
