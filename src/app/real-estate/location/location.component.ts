import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

import {} from 'googlemaps';

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  address?: string;
  draggable: boolean;
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  @Output() position = new EventEmitter<Marker>();

  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  options = {
    types: [],
    // componentRestrictions: { country: 'EG' },
  };

  newAddress = '';
  zoom = 8;
  initialMarker: Marker;
  estatePosition: Marker = {
    lat: 0,
    lng: 0,
    address: '',
    draggable: false,
  };

  lat: number;
  lng: number;

  constructor() {}

  ngOnInit(): void {
    if (navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
        this.estatePosition = {
          lat: this.lat,
          lng: this.lng,
          address: '',
          draggable: false,
        };
      });
    }
  }

  mapClicked(event): void {
    this.estatePosition = {
      lat: event.coords.lat,
      lng: event.coords.lng,
      draggable: false,
    };

    const location = new google.maps.LatLng(event.coords.lat, event.coords.lng);
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      const loc = {
        lat: event.coords.lat,
        lng: event.coords.lng,
        draggable: false,
        address: results[1].formatted_address
      };
      this.position.emit(loc);
    });
  }

  handleAddressChange(address: Address): void {
    for (const add of address.address_components) {
      this.newAddress = this.newAddress + add.short_name + ' ';
    }

    this.lat = address.geometry.location.lat();
    this.lng = address.geometry.location.lng();
    this.estatePosition = {
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng(),
      address: this.newAddress,
      draggable: false,
    };
    this.zoom = 14;
    this.position.emit(this.estatePosition);
  }
}
