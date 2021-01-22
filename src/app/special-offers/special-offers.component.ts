import { RealEstate } from './../shared/models/RealEstate.model';
import { DialogService } from './../shared/services/dialog.service';
import { RealEstateService } from './../shared/services/real-estate.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.scss']
})
export class SpecialOffersComponent implements OnInit {

  constructor(
    private realEstateService: RealEstateService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  realEstate: RealEstate[];
  titles: string;

  ngOnInit(): void {
    // this.realEstateService.getAllRealEstates().subscribe(
    //   (data) => {
    //     this.realEstate = data.map((el) => {
    //       return {
    //         id: el.payload.doc.id,
    //         ...el.payload.doc.data(),
    //       };
    //     });
    //   },
    //   (error) => {
    //     console.log(error);
    //   },
    //   () => {}
    // );
  }

  search(): any {
    if (this.titles !== '') {
      if (this.realEstate) {
        this.realEstate = this.realEstate.filter((res) => {
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

  getDestails(id): void{
    this.router.navigate(['real-estate-details/' , id]);
  }

}
