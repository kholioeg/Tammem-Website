import { CampaignsService } from '../shared/services/campaigns.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.scss']
})
export class SpecialOffersComponent implements OnInit {
  constructor(private campaignService: CampaignsService) {}
  
  ngOnInit(): void {
  }

}
