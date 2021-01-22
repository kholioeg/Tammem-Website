import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { RealEstate } from './../models/RealEstate.model';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root',
})
export class RealEstateService {
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
    console.log('page' + page);

    const getListings = this.fns.httpsCallable('getListings');
    return getListings({ pageNumber: page });
  }

  // getFirstPage(): Observable<any> {
  //   return this.fs
  //     .collection('campaigns', (ref) => {
  //       return ref.orderBy('date_time', 'desc').limit(12);
  //     })
  //     .valueChanges();
  // }


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

  initializeRealEstate(): RealEstate {
    this.realEstate = {
      title: '',
      price: 0,
      description: '',
      area: 0,
      interface: '',
      bedRooms: 0,
      flats: 0,
      lounges: 0,
      bathRooms: 0,
      streetWidth: 0,
      estateAge: 0,
      options: [''],
      imagesUrls: [],
      views: 0,
      createdFrom: new Date(),
      createdAt: new Date(),
      userName: '',
      userImage: '',
      hashId: 0,
      location: { lat: '', lng: '' },
    };
    return this.realEstate;
  }
}
