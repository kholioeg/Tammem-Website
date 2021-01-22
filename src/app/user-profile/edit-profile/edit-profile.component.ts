import { AuthService } from './../../shared/services/auth.service';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}


  image: string;
  userId: string;
  ngOnInit(): void {
    this.userId = this.authService.userId;
  }

  onSubmit(): void {
    // this.form.value.id = this.authService.userId;
    // this.userService.createUser(this.form.value, this.userId);
  }

  onSelect(event): void {
    // this.form.value.image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e: any) => {
      this.image = e.target.result;
    };
  }
}
