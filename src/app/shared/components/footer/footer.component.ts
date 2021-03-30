import { OrderDialogComponent } from './../../../order-dialog/order-dialog.component';
import { DialogService } from './../../services/dialog.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  url: string;
  subscriptions: Subscription[] = [];

  constructor(private dialog: DialogService, private router: Router) {}
  ngOnInit(): void {
    this.subscriptions[0] = this.router.events.subscribe((event: NavigationStart) => {
      if (event instanceof NavigationStart) {
        this.url = event.url;
      }
    });
  }

  openDialog(): void {
    this.dialog.openConfirmDialog(OrderDialogComponent, 'OrderDialogComponent');
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions){
      subscription.unsubscribe();
    }
  }
}
