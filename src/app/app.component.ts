import { Directionality } from '@angular/cdk/bidi';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {


  constructor(
    private dir: Directionality,
  ) {}


  ngOnDestroy(): void {
    // this._dirChangeSubscription.unsubscribe();
  }
}
