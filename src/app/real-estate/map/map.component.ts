import { MapService } from './../../shared/services/map.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import {} from 'googlemaps';

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  address?: string;
  draggable: boolean;
}

@Component({
  templateUrl: './map.component.html',
  selector: 'app-map',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement: any;
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

  zoom = 15;
  initialMarker: Marker;

  campaignPosition: Marker = {
    lat: 0,
    lng: 0,
    address: '',
    draggable: false,
  };

  markers: Marker[] = [];

  lat: number;
  lng: number;

  constructor(private mapService: MapService) {}

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

        this.markers.push(this.campaignPosition);

        // this.mapService.getPoints().subscribe((data) => {
        //   const myLocation = new google.maps.LatLng(this.lat, this.lng);
        //   for (const item of data) {
        //     const loc2 = new google.maps.LatLng(item.point.l_, item.point.__);
        //     const distance = google.maps.geometry.spherical.computeDistanceBetween(
        //       myLocation,
        //       loc2
        //     );

        //     console.log(distance);

        //     if (distance <= 20000) {
        //       const point = {
        //         lat: item.point.l_,
        //         lng: item.point.__,
        //         address: '',
        //         draggable: false,
        //       };
        //       this.markers.push(point);
        //     }
        //   }
        // });

      });
    }
  }

  log(event): void {
    console.log(event.coords);
  }

  circleAdded(e): void {
    // if (e.getBounds().contains(new google.maps.LatLng(this.lat, this.lng))){
    this.mapService.getBounds(e).subscribe((map) => {
      // console.log(map);
    });
    // }
  }
}
