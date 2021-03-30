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


}
