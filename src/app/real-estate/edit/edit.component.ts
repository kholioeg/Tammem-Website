import { OptionsService } from './../../shared/services/options.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CampaignsService } from 'src/app/shared/services/campaigns.service';
import { ActivatedRoute } from '@angular/router';
import { RealEstate } from 'src/app/shared/models/RealEstate.model';
import { Campaign } from 'src/app/shared/models/campaign.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, AfterViewInit {
  options = new Set([]);
  realEstateFromServer: RealEstate;
  optionsFromService: string[];
  form = this.campaignService.form;
  imagesFiles: any[] = [];
  id: string;
  urls = [];
  isChecked: boolean;

  @ViewChild('options') optionFromTemplate: ElementRef;
  constructor(
    private campaignService: CampaignsService,
    private optionsService: OptionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.campaignService.getRealEstate(this.id).subscribe(
      async (data) => {
        this.realEstateFromServer = await data;
        this.form.setValue({
          title: this.realEstateFromServer.title,
          price: this.realEstateFromServer.price,
          description: this.realEstateFromServer.description,
          area: this.realEstateFromServer.area,
          interface: this.realEstateFromServer.interface,
          bedRooms: this.realEstateFromServer.bedRooms,
          flats: this.realEstateFromServer.lounges,
          lounges: this.realEstateFromServer.lounges,
          bathRooms: this.realEstateFromServer.bathRooms,
          streetWidth: this.realEstateFromServer.streetWidth,
          estateAge: this.realEstateFromServer.estateAge,
          options: this.realEstateFromServer.options,
          views: 0,
          createdFrom: 0,
          createdAt: this.realEstateFromServer.createdAt,
          userName: '',
          userImage: '',
          hashId: 0,
          location: this.realEstateFromServer.location,
        });

        this.urls = await this.realEstateFromServer.imagesUrls;
      },
      (error) => {},
      () => {}
    );

    this.optionsService.getAllOptions().subscribe((data) => {
      this.optionsFromService = data;


    });
  }

  ngAfterViewInit(): void {}

  onSubmit(): void {
    this.form.value.imagesUrls = this.urls;
    this.campaignService.updateRealEstate(this.form.value, this.id);
  }

  pushOptions(event, option): void {
    if (event.checked) {
      this.options.add(event.source.value);
    }

    if (!event.checked) {
      this.options.delete(event.source.value);
    }

    const optionsArray = Array.from(this.options);
    this.form.value.options = optionsArray;
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
    this.form.value.location = $event;

    console.log($event);
  }
}
