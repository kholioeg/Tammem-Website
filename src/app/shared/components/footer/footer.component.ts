import { DialogService } from './../../services/dialog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private dialog: DialogService) { }

  ngOnInit(): void {
  }

  openDialog(): void{
    this.dialog.openConfirmDialog('OrderDialogComponent');
  }
}
