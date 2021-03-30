import { AuthService } from '../../../services/auth.service';
import { WindowService } from '../../../services/window.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';

import { Router } from '@angular/router';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  windowRef: any;
  errorMessage = null;
  @Output() otpRecieved = new EventEmitter<object>();

  otp = false;
  form = { profile_type: 'user' };
  isUser: boolean;
  isOwner: boolean;
  isBroker: boolean;
  phoneNumber: number;
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
      console.log(this.user.uid);
      // this.router.navigate(['/real-estates']);
    });
  }

  ngAfterViewInit(): void {
    // this.authService.initializeWindowRef();
  }

  onSubmit(form): void {
    console.log(form.value);
  }

  sendLoginCode(num): void {
    this.phoneNumber = num.value.phoneNumber.e164Number;
    this.otpRecieved.emit({ isRecieved: true, phoneNum: this.phoneNumber });

    this.authService
      .login(num.value.phoneNumber.e164Number)
      .then((response) => {
        this.otp = true;
        this.windowRef.confirmationResult = response;
      })
      .catch((error) => {
        if (error) {
          this.errorMessage = 'يوجد خطأ بالرقم';
        }
      });
  }

}
