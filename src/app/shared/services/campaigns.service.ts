import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
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

  getFirstPage(): Observable<any> {
    const getListings = this.fns.httpsCallable('getListings');
    return getListings({ pageNumber: 0 });
  }

  getPage(page): Observable<any> {
    const getListings = this.fns.httpsCallable('getListings');
    return getListings({ pageNumber: page });
  }

  getRealEstate(id: string): Observable<any> {
    return this.fs.collection('RealEstates').doc(id).valueChanges();
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
    await this.getRealEstate(id).subscribe((realEstate) => {
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

  getCampaignsByCategory(category: string, page: number): any {
    const filters = `category_code:${category}`;
    return this.index.search('', {
      hitsPerPage: 12,
      filters,
      page,
    });
  }

  getFilteredCampaignsCount(filter): any {

    this.index.setSettings({
      attributesToRetrieve: ['campaign_type', 'campaign_ownership', 'category_code']
    });

    let filters;
    if (filter.category_code){
      filters = `category_code:${filter.category}`;
    }

    if (filter.type){
      console.log('type');
      filters = `campaign_type:${filter.type}`;
    }

    if (filter.min_area){
      filters = `area >= ${filter.min_area}`;
    }

    if (filter.max_area){
      filters = `area <= ${filter.max_area}`;
    }

    const query = this.index.search('', {
      hitsPerPage: 12,
      filters,
    });

    return query;
  }

  getCampaignsByRegion(region: string, page: number): any {
    const filters = `search_data.region_en:'${region}'`;
    return this.index.search('', {
      hitsPerPage: 12,
      page,
      filters,
    });
  }
}
