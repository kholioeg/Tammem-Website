import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './../shared/services/auth.service';
import { UserService } from './../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/User.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  direction = localStorage.getItem('direction');
  constructor(
    private userService: UserService,
    private authService: AuthService,
    public translate: TranslateService
  ) {}

  user: User = new User();
  id: string;
  ngOnInit(): void {
    this.userService.getUserDoc(this.authService.userId).subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }
}
