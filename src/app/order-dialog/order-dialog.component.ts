import { DialogService } from './../shared/services/dialog.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss'],
})
export class OrderDialogComponent implements OnInit {
  dir: string;

  constructor(
    public translate: TranslateService,
    private router: Router,
    private dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.dir = localStorage.getItem('direction');
  }

  // method to navigate to the url given as a parameter
  // ex: go to : home/add-campaign
  navigate(url): void {
    this.dialog.closeDialog();
    this.router.navigate([url]);
  }
}
