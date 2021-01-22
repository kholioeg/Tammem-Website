import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private fs: AngularFirestore) {}

  getPoints(): Observable<any> {
    return this.fs.collection('points').valueChanges();
  }

  getTabouk(): Observable<any> {
    return this.fs.collection('regions').valueChanges();
  }

  getBounds(event): Observable<any> {
    return this.fs
      .collection('points', (ref) => {

        console.log(ref);

        return ref.where(event.getBounds().contains(new google.maps.LatLng(23.00, 20.00)), '==', true)
      })
      .valueChanges();
  }

  getRegions(): any{
    return this.fs.collection('regions').valueChanges();
  }
}
