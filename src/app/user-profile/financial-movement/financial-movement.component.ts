import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import {RatingModule} from 'ngx-rating';

@Component({
  selector: 'app-financial-movement',
  templateUrl: './financial-movement.component.html',
  styleUrls: ['./financial-movement.component.scss']
})
export class FinancialMovementComponent implements OnInit {
  rating: any;
  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

}
