import { TranslateService } from '@ngx-translate/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {RatingModule} from 'ngx-rating';
import { FinancialMovementService } from 'src/app/shared/services/financial-movement.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-financial-movement',
  templateUrl: './financial-movement.component.html',
  styleUrls: ['./financial-movement.component.scss']
})
export class FinancialMovementComponent implements OnInit, OnDestroy {
  rating = 4;
  paidMovements: any;
  unPaidMovements: any;
  paidMovementsSub: Subscription;
  unPaidMovementsSub: Subscription;
  constructor(public translate: TranslateService, private financialMovementService: FinancialMovementService) { }

  ngOnInit(): void {
    this.paidMovementsSub = this.financialMovementService.getMovements('paid').subscribe(movements => {
      this.paidMovements = movements;
    });

    this.unPaidMovementsSub = this.financialMovementService.getMovements('unpaid').subscribe(movements => {
      this.unPaidMovements = movements;
    });
  }

  ngOnDestroy(): void {
    this.paidMovementsSub.unsubscribe();
    this.unPaidMovementsSub.unsubscribe();
  }
}
