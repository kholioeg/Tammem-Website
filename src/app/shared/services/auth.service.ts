import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { User } from './../models/User.model';
import { WindowService } from './window.service';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  verificationCode: string;
  windowRef = this.win.windowRef;
  user: Observable<any>;
  userId: string;
  constructor(
    private win: WindowService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.user = afAuth.user;
  }

  // initializeWindowRef(): void {
  //   this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  //     'recaptcha-container',
  //     {
  //       size: 'invisible',
  //       callback: (response) => {
  //         console.log(response);
  //       },
  //     }
  //   );
  //   this.windowRef.recaptchaVerifier.render();
  // }

  login(num): Promise<any> {
    const appVerifier = (this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
      }
    ));
    return firebase.auth().signInWithPhoneNumber(num, appVerifier);
  }

  verify(verificationCode): any {
    return this.windowRef.confirmationResult
      .confirm(verificationCode)
      .then((result) => {
        return result;
      })

      .catch((error) => console.log(error, 'Incorrect code entered?'));
  }

  logout(): Promise<any> {
    console.log(this.user);

    return this.afAuth.signOut();
  }

  getUser(id): Observable<any> {
    return this.db.collection('users').doc(id).valueChanges();
  }
  
  updateUserLang(lang, id): void {
    this.db.collection('users').doc(id).update({
      user_app_language: lang,
    });
  }

  // resend(): void {
  //   this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  //     'recaptcha',
  //     {
  //       size: 'invisible',
  //     }
  //   );
  //   this.windowRef.recaptchaVerifier.render();
  // }
}
