import { ServicesService } from './../shared/services/services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  services: any;

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.servicesService.getAllServices().subscribe((data) => {
      this.services = data.map((result) => {
        return {
          id: result.payload.doc.id,
          ...result.payload.doc.data()
        };
      });
      console.log(this.services);
    });
  }
}
