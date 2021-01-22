import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {
  dir: string;
  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    this.dir  = localStorage.getItem('direction');
  }

}
