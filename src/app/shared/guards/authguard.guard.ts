import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return new Promise((resolve) => {
      return this.authService.user.subscribe((user) => {
        if (user) {
          this.authService.userId = user.uid;
          return resolve(true);
        } else {
          return this.router.navigate(['']);
        }
      });
    });
  }
}
