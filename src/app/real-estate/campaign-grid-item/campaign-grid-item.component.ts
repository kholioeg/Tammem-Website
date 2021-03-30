import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-campaign-grid-item',
  templateUrl: './campaign-grid-item.component.html',
  styleUrls: ['./campaign-grid-item.component.scss'],
})
export class CampaignGridItemComponent {
  @Input() campaign: any;
  direction = localStorage.getItem('direction');

  constructor(private router: Router, public translate: TranslateService) {}


  getDetails(id): void {
    this.router.navigate(['home', 'listings', id]);
  }
}
