import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private fs: AngularFirestore) {}

  getAllServices(): Observable<any> {
    return this.fs.collection('services').snapshotChanges();
  }
}
