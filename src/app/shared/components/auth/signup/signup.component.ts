import { AuthService } from '../../../services/auth.service';
import { PhoneNumber } from '../../../models/PhoneNumber';
import { WindowService } from '../../../services/window.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  SearchCountryField,

  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit{
  windowRef: any;

  form = { profile_type: 'user' };
  isUser: boolean;
  isOwner: boolean;
  isBroker: boolean;
  phoneNumber = new PhoneNumber();
  verificationCode: string;
  user: any;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  constructor(
    private win: WindowService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.windowRef = this.authService.windowRef;
    this.authService.user.subscribe((user) => {
      this.user = user;
      this.router.navigate(['/real-estates']);
    });
  }

  ngAfterViewInit(): void {
    // this.authService.initializeWindowRef();
  }

  sendLoginCode(): void {
    const num = this.phoneNumber.e164;
    this.authService.login(num);
  }

  verifyLoginCode(): void {
    this.authService.verify(this.verificationCode).then((user) => {
      // console.log(user[0].uid);
    });
  }

  onSubmit(form): void {
    console.log(form.value);
  }
}
