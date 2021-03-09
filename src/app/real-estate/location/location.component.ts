import { TranslateService } from '@ngx-translate/core';
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

  styles = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dadada',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#c9c9c9',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
  ];


  options = {
    types: [],
    // componentRestrictions: { country: 'EG' },
  };

  newAddress = '';
  zoom = 11;
  initialMarker: Marker;
  campaignPosition: Marker = {
    lat: 0,
    lng: 0,
    address: '',
    draggable: false,
  };

  lat: number;
  lng: number;

  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    if (navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
        this.campaignPosition = {
          lat: this.lat,
          lng: this.lng,
          address: '',
          draggable: false,
        };
        console.log(this.campaignPosition);

      });
    }
  }

  mapClicked(event): void {
    this.campaignPosition = {
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
    this.campaignPosition = {
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng(),
      address: this.newAddress,
      draggable: false,
    };
    this.zoom = 14;
    this.position.emit(this.campaignPosition);
  }
}
