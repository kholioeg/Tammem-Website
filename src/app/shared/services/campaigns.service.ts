import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { RealEstate } from '../models/RealEstate.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireFunctions } from '@angular/fire/functions';
import algoliasearch from 'algoliasearch';

@Injectable({
  providedIn: 'root',
})
export class CampaignsService {
  client = algoliasearch('A3QG90AML9', 'b94b20314d739229f4d15b3316f93117');
  index = this.client.initIndex('listings');

  filteredCampaigns = new BehaviorSubject([]);
  constructor(
    private fs: AngularFirestore,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private fns: AngularFireFunctions
  ) {}

  imagesFiles: File[] = [];
  realEstate = new RealEstate();
  downloadUrls = [];
  userId = this.authService.userId;

  form = this.fb.group({
    title: [this.realEstate.title, [Validators.required]],
    price: [this.realEstate.price, [Validators.required]],
    description: [this.realEstate.description, [Validators.required]],
    area: [this.realEstate.area, [Validators.required]],
    interface: [this.realEstate.interface],
    bedRooms: [this.realEstate.bedRooms],
    flats: [this.realEstate.flats],
    lounges: [this.realEstate.lounges],
    bathRooms: [this.realEstate.bathRooms],
    streetWidth: [this.realEstate.streetWidth],
    estateAge: [this.realEstate.estateAge],
    options: [this.realEstate.options],
    views: [this.realEstate.views],
    createdFrom: [this.realEstate.createdFrom],
    createdAt: [this.realEstate.createdAt],
    userName: [this.realEstate.userName],
    userImage: [this.realEstate.userImage],
    hashId: [this.realEstate.hashId],
    location: [this.realEstate.location],
  });

  getFirstPage(isSpecial?: boolean): any {
    if (!isSpecial) {
      console.log('not-special');
      return this.index.search('', {
        hitsPerPage: 12,
        page: 1,
      });
    }

    if (isSpecial) {
      console.log('special');
      const facetFilters = ['is_active:true', 'campaign_type: special'];
      return this.index.search('', {
        facetFilters,
        hitsPerPage: 12,
      });
    }
  }

  getPage(page): any {
    return this.index.search('', {
      hitsPerPage: 12,
      page,
    });
  }

  getCampaignById(id: string): Observable<any> {
    return this.fs.collection('campaigns').doc(id).valueChanges();
  }

  getUser(): Observable<any> {
    return this.fs
      .collection('users')
      .doc(this.authService.userId)
      .valueChanges();
  }

  async addNewRealEstate(realEstate, imagesFiles: File[]): Promise<any> {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < imagesFiles.length; ++i) {
      const ref = await this.storage.ref(
        'images/' + imagesFiles[i].name + '_' + Date.now()
      );

      await ref.put(imagesFiles[i]).then(() => {
        ref.getDownloadURL().subscribe(
          (Url) => {
            this.downloadUrls.push(Url);
          },
          (err) => {
            console.log(err);
          },
          () => {
            if (i >= imagesFiles.length - 1) {
              this.fs.collection('campaigns').add({
                ...realEstate,
                images_urls: this.downloadUrls,
                advertiser_uid: this.userId,
              });
            }
          }
        );
      });
    }
  }

  updateRealEstate(realEstate: RealEstate, id: string): void {
    this.fs.collection('RealEstates').doc(id.toString()).update(realEstate);
  }

  async deleteRealEstate(id: string): Promise<any> {
    await this.getCampaignById(id).subscribe((realEstate) => {
      for (const image of realEstate.imagesUrls) {
        this.storage.storage.refFromURL(image).delete();
      }
    });
    this.fs.collection('RealEstates').doc(id).delete();
  }

  getCampaignsCategories(category): Observable<any> {
    if (category === 'all') {
      return this.fs.collection('categories').valueChanges();
    } else {
      return this.fs
        .collection('categories', (ref) =>
          ref.where('category_type', '==', category)
        )
        .valueChanges();
    }
  }

  getAllCategories(): Observable<any> {
    return this.fs.collection('categories').valueChanges();
  }

  getAllRegions(): Observable<any> {
    return this.fs.collection('regions').valueChanges();
  }

  getCampaignsByCategory(
    category: string,
    page: number,
    isSpecial?: boolean
  ): any {
    if (!isSpecial) {
      const filters = `category_code:${category}`;
      return this.index.search('', {
        hitsPerPage: 12,
        filters,
        page,
      });
    }

    if (isSpecial) {
      this.index = this.client.initIndex('sponsered_ads');
      const filters = `category_code:${category}`;
      return this.index.search('', {
        hitsPerPage: 12,
        filters,
        page,
      });
    }
  }

  getFilteredCampaigns(
    filter,
    count: boolean,
    page?: number,
    isSpecial?: boolean
  ): any {
    const facetFilters = ['is_active:true'];
    const numericFilters = [];

    if (filter.category !== undefined) {
      facetFilters.push(`category_code:${filter.category}`);
    }

    if (filter.type !== undefined) {
      facetFilters.push(`campaign_type:${filter.type}`);
    }

    if (filter.min_area) {
      numericFilters.push(`area >= ${filter.min_area}`);
    }

    if (filter.max_area) {
      numericFilters.push(`area <= ${filter.max_area}`);
    }
    if (!isSpecial) {
      let query;
      if (count) {
        query = this.index.search('', {
          facetFilters,
          numericFilters,
          attributesToRetrieve: [],
        });
      } else {
        query = this.index.search('', {
          facetFilters,
          numericFilters,
          hitsPerPage: 12,
          page,
        });
      }
      return query;
    }

    if (isSpecial) {
      let query;
      if (count) {
        const specialFacetFilters = [
          'campaign_type : special',
          ...facetFilters,
        ];
        query = this.index.search('', {
          specialFacetFilters,
          numericFilters,
          attributesToRetrieve: [],
        });
      } else {
        query = this.index.search('', {
          facetFilters,
          numericFilters,
          hitsPerPage: 12,
          page,
        });
      }
      return query;
    }
  }

  getCampaignsByRegion(region: string, page: number): any {
    const filters = `search_data.region_en:'${region}'`;
    return this.index.search('', {
      hitsPerPage: 12,
      page: page || 1,
      filters,
    });
  }

  searchInsidePolygon(polygon): any {
    return this.index.search('', {
      insidePolygon: [polygon],
    });
  }

  searchInsideCirlcle(latLng, radius): any {
    return this.index.search('', {
      aroundLatLng: latLng,
      aroundRadius: radius,
    });
  }

  getAdveriser(id): Observable<any> {
    return this.fs.collection('users').doc(id).valueChanges();
  }

  getDistrict(districtName, dir): Observable<any> {
    if (dir === 'rtl') {
      return this.fs
        .collection('districts_v2', (ref) =>
          ref.where('district_ar', '==', districtName)
        )
        .snapshotChanges();
    } else {
      return this.fs
        .collection('districts_v2', (ref) =>
          ref.where('district_en', '==', districtName)
        )
        .snapshotChanges();
    }
  }

  getDistrictRatings(id): any {
    return this.fs
      .collection('districts_v2')
      .doc(id)
      .collection('ratings')
      .valueChanges();
  }

  getAveragePrices(id): any {
    return this.fs
      .collection('districts_v2')
      .doc(id)
      .collection('years_halfs')
      .valueChanges({idField: 'id'});
  }
  getBuildingSide(sideCode): Observable<any> {
    return this.fs
      .collection('building_sides', (ref) => ref.where('code', '==', sideCode))
      .valueChanges();
  }

  getRelatedCampaigns(latLng, radius, catCode, isFirstEmit): any {
    let facetFilters;

    if (isFirstEmit) {
      facetFilters = ['is_active:true', `category_code:${catCode}`];
    } else {
      facetFilters = ['is_active:true'];
    }

    return this.index.search('', {
      facetFilters,
      aroundLatLng: latLng,
      aroundRadius: radius,
      hitsPerPage: 31,
    });
  }
}
