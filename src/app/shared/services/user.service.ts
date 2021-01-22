import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private fs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  user: User = new User();


  createUser(user, id): void {
    const ref = this.storage.ref('usersImages' + user.image + '_' + Date.now());
    ref.put(user.image).then(() => {
      ref.getDownloadURL().subscribe(
        (data) => {
          user.image = data;
        },
        (error) => {},
        () => {
          this.fs.doc('users/' + id).set({
            name: user.name,
            image: user.image,
          });
        }
      );
    });
  }

  updateUser(): void {}

  getUserStream(): void {}

  getUserDoc(id): Observable<any> {
    return this.fs.collection('users').doc(id).valueChanges();
  }
}
