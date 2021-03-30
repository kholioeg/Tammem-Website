import { AgmGeocoder, MapsAPILoader } from '@agm/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MapService } from './../../shared/services/map.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import {} from 'googlemaps';
import { LatLngBounds } from 'ngx-google-places-autocomplete/objects/latLngBounds';
import { CampaignsService } from 'src/app/shared/services/campaigns.service';
import { MapCampaignService } from 'src/app/shared/services/map-campaign.service';
import { Subscription } from 'rxjs';

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  address?: string;
  draggable?: boolean;
  icon?: object;
}

@Component({
  templateUrl: './map.component.html',
  selector: 'app-map',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
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

  paths: any;
  zoom = 15;
  markers: Marker[] = [];
  currentLocationMarker: Marker;
  lat: number;
  lng: number;
  showCampaignDetails = false;
  shape: any;
  district: string;
  subscriptions: Subscription[] = [];
  totalCampaignsCount: number;

  constructor(
    private campaignService: CampaignsService,
    private mapCampaignService: MapCampaignService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (navigator) {
      navigator.geolocation.watchPosition((pos) => {
        console.log(pos);

        this.lng = pos.coords.longitude;
        this.lat = pos.coords.latitude;

        // current-location.svg
        this.markers[0] = {
          lat: this.lat,
          lng: this.lng,
          address: '',
          draggable: false,
          icon: {
            url: './assets/map-icons/current-location.png',
          }
        };
      });
    }
  }

  boundsChange(latLngBounds: LatLngBounds): void {

    if (this.shape) {
      this.shape.overlay.setMap(null);
    }
    const neLat = latLngBounds.getNorthEast().lat();
    const neLng = latLngBounds.getNorthEast().lng();
    const swLat = latLngBounds.getSouthWest().lat();
    const swLng = latLngBounds.getSouthWest().lng();

    const paths = [neLat, neLng, neLat, swLng, swLat, swLng, swLat, neLng];

    this.campaignService.searchInsidePolygon(paths).then((result) => {
      this.totalCampaignsCount = result.nbHits;

      const tempMarkers = [];
      const dir = localStorage.getItem('direction');

      result.hits.forEach((campaign) => {
        const currency = campaign.price.toString();
        if (currency. length < 4){
          campaign.currency = dir === 'rtl' ? 'ر.س' : 'rs';
        } else if (currency.length < 7){
          campaign.currency = dir === 'rtl' ? 'الف' : 'thousand';
        }else {
          campaign.currency = dir === 'rtl' ? 'م' : 'million';
        }
        const marker = {
          id: campaign.id,
          lat: campaign.location_point._latitude,
          lng: campaign.location_point._longitude,
          price: `${campaign.price.toString().substring(0, 3)} ${campaign.currency}`,
          thumbnail: campaign.thumbnail_url,
          campaign_type: campaign.campaign_type,
          category_ar: campaign.search_data?.category_ar,
          category_en: campaign.search_data?.category_en,
          location_name: campaign.location_name,
          area: campaign.area,
          icon: {},
        };

        if (campaign.campaign_type === 'special') {
          marker.icon = {
            url: './assets/map-icons/golden-map-icon.png',
            scaledSize: {
              width: 60,
              height: 45,
            },
            labelOrigin: { x: 27, y: 12 },
          };
        }

        if (campaign.campaign_type === 'normal') {
          marker.icon = {
            url: './assets/map-icons/blue-map-icon.png',
            scaledSize: {
              width: 60,
              height: 45,
            },
            labelOrigin: { x: 27, y: 12 },
          };
        }

        tempMarkers.push(marker);
      });

      this.markers = tempMarkers;
    });
  }


  centerChange(event): void{

    let url;
    const dir = localStorage.getItem('direction');

    if (dir === 'rtl'){
      url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${event.lat},${event.lng}&key=AIzaSyCy7Tt-e3SBytutac7vdDPvW8Q1W1FPtzo&language=ar`;
    } else {
      url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${event.lat},${event.lng}&key=AIzaSyCy7Tt-e3SBytutac7vdDPvW8Q1W1FPtzo&language=en`;
    }

    const geocode$ = this.http.get(url);

    this.subscriptions[0] = geocode$.subscribe((response: any) => {

      if (dir === 'rtl'){
        const districtWithCode = response.plus_code.compound_code.split('،')[0].split(' ');
        const district = districtWithCode.slice(1, districtWithCode.length).join(' ');
        this.district = district;
      } else {
        const districtWithCode = response.plus_code.compound_code.split(',')[0].split(' ');
        const district = districtWithCode.slice(1, districtWithCode.length ).join(' ');
        this.district = district;
      }
    });
  }

  mapClick(event): void {
    this.showCampaignDetails = false;
  }

  circleAdded(event): void {
    if (this.shape) {
      this.shape.overlay.setMap(null);
    }

    this.shape = event;
    if (event.type === 'circle') {
      const latLng = `${this.shape.overlay.center.lat()}, ${this.shape.overlay.center.lng()}`;

      const radius = Math.round(this.shape.overlay.radius);

      this.campaignService
        .searchInsideCirlcle(latLng, radius)
        .then((result) => {
          const tempMarkers = [];
          console.log(result);
          result.hits.forEach((campaign) => {
            const marker = {
              id: campaign.id,
              lat: campaign.location_point._latitude,
              lng: campaign.location_point._longitude,
              price: campaign.price.toString().substring(0, 3),
              thumbnail: campaign.thumbnail_url,
              campaign_type: campaign.campaign_type,
              category_ar: campaign.search_data?.category_ar,
              category_en: campaign.search_data?.category_en,
              location_name: campaign.location_name,
              area: campaign.area,
              icon: {},
            };
            if (campaign.campaign_type === 'special') {
              marker.icon = {
                url: './assets/map-icons/golden-map-icon.png',
                scaledSize: {
                  width: 40,
                  height: 35,
                },
                labelOrigin: { x: 20, y: 10 },
              };
            }
            if (campaign.campaign_type === 'normal') {
              marker.icon = {
                url: './assets/map-icons/blue-map-icon.png',
                scaledSize: {
                  width: 40,
                  height: 35,
                },
                labelOrigin: { x: 20, y: 10 },
              };
            }
            tempMarkers.push(marker);
          });
          this.markers = [...tempMarkers];
        });
    }
  }

  setDetails(marker): void {
    this.showCampaignDetails = true;
    this.mapCampaignService.campaign = marker;
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions){
      subscription.unsubscribe();
    }
  }
}
