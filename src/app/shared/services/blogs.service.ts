import { Observable } from 'rxjs';
import {
  AngularFirestore,
  DocumentData,
  QuerySnapshot,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private af: AngularFirestore) {}

  getAllBlogs(): Observable<any> {
    return this.af
      .collection('blog_news', (ref) =>
        ref.where('deleted', '==', false).where('is_confirmed', '==', true)
      )
      .valueChanges();
  }

  getBlog(id): Observable<any> {
    return this.af.collection('blog_news').doc(id).valueChanges();
  }
}
