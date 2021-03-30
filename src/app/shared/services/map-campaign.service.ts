import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapCampaignService {
  mapCampaign$ = new BehaviorSubject({});

  constructor() {}

  set campaign(campaign) {
    this.mapCampaign$.next(campaign);
  }

  get campaign(): Observable<any> {
    return this.mapCampaign$;
  }


}
