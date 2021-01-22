import { PhoneNumber } from './../../../models/PhoneNumber';
import { AuthDialogService } from './../../../services/auth-dialog.service';

import { AuthService } from './../../../services/auth.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  otpNumber: number;
  @Input() phoneNumber;
  timer = 23;
  constructor(
    private authService: AuthService,
    private authDialog: AuthDialogService
  ) {}

  ngOnInit(): void {}

  onOtpChange(e): void {
    if (e.length >= 6) {
      this.otpNumber = e;
    }
  }
  sendOtpCode(): void {
    this.authService.verify(this.otpNumber).then((user) => {
      this.authDialog.closeLoginDialog();
      // console.log(user);
    });
  }

  resendOtp(): void {
    // this.authService.resend();
  }
}
