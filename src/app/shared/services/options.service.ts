import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  constructor(private fs: AngularFirestore) {}

  getAllOptions(): any {
    return this.fs.collection('options').valueChanges();
  }
}
