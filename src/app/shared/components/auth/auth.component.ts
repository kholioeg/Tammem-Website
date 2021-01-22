import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  signup = false;
  login = true;
  otp = false;
  phoneNumber: string;
  constructor() { }

  ngOnInit(): void {
  }

  changeOtp(event): void{
    this.otp = event.isRecieved;
    this.phoneNumber = event.phoneNum;
  }
}
