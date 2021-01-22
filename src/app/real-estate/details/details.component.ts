import { RealEstateService } from 'src/app/shared/services/real-estate.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RealEstate } from 'src/app/shared/models/RealEstate.model';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import {
  MatCarouselSlide,
  MatCarouselSlideComponent,
} from '@ngmodule/material-carousel';
import { User } from '../../shared/models/User.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  realEstate: RealEstate;
  constructor(
    private route: ActivatedRoute,
    private realEstateService: RealEstateService
  ) {}
  currentImage: string;
  images: Array<any>;
  user: User;
  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.realEstateService.getUser().subscribe((user) => {
      this.user =  user;
    });
    this.realEstateService.getRealEstate(id).subscribe(
      (data) => {
        this.realEstate = data;
        // this.currentImage = data.imagesUrls[0];
      },
      (error) => {},
      () => {
        this.images = this.realEstate.imagesUrls;
        console.log(this.images);
      }
    );
  }

  selectImage(event): void {
    this.currentImage = event.target.src;
  }
}
