import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private fs: AngularFirestore) { }

  getAllCategories(): Observable<any>{
    return this.fs.collection('categories').get();
  }
}
