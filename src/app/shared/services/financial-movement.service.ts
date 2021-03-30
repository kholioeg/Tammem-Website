import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FinancialMovementService {
  constructor(private fs: AngularFirestore, private authService: AuthService) {}

  getMovements(status: string): Observable<any> {
    return this.fs
      .collection('users')
      .doc(this.authService.userId)
      .collection('financial_movement', (ref) =>
        ref.where('is_paid', '==', status === 'paid' ? true : false)
      )
      .valueChanges();
  }
}
