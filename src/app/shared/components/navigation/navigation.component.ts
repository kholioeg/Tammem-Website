import { AuthDialogService } from './../../services/auth-dialog.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Direction } from '@angular/cdk/bidi';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  user: any;
  selected = 'ar';
  dir: string;
  currentLang: string;
  flag: any;

  public flags = [
    { name: 'العربية', image: '../assets/images/flags/egypt.svg', lang: 'ar' },
    { name: 'English', image: 'assets/images/flags/gb.svg', lang: 'en' },
  ];


  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 1280px)')
    .pipe(
      map((result) => {
        return result.matches;
      }),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private dialog: AuthDialogService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.flag = this.flags[0];
    this.authService.user.subscribe((data) => {
      this.authService.getUser(data.uid).subscribe((user) => {
        if (!this.user){
          this.currentLang = 'ar';
          this.flag = this.flags[0];
          this.translate.use('ar');
        }else{

          this.user = user;
          this.currentLang = user.user_app_language;
          if (this.currentLang === 'ar'){
            this.flag = this.flags[0];
          } else {
          this.flag = this.flags[1];
          }
          this.translate.use(this.currentLang);
        }

        const body = document.getElementsByTagName('body');

        if (this.currentLang === 'en') {
          body[0].setAttribute('dir', 'ltr');
          this.dir = 'ltr';
          this.flag = { name: 'English', image: 'assets/images/flags/gb.svg', lang: 'en' };
        } else {
          body[0].setAttribute('dir', 'rtl');
          this.dir = 'rtl';
          this.flag =  { name: 'العربية', image: '../assets/images/flags/egypt.svg', lang: 'ar' };
        }

        if (!this.user){
          body[0].setAttribute('dir', 'rtl');
          this.flag =  { name: 'العربية', image: '../assets/images/flags/egypt.svg', lang: 'ar' };
        }
      });
    });
  }

  logout(): void {
    this.authService.logout().then(() => {
      window.location.reload();
      this.router.navigate(['/']);
      console.log(this.user);
    });
  }

  login(): void {
    this.dialog.openLoginDialog();
  }

  changeLang(flag): void {
    this.flag = flag;
    this.currentLang = flag.lang;
    this.translate.use(flag.lang);
    if (this.user) {
      this.authService.updateUserLang(flag.lang, this.user.uid);
    }
    const body = document.getElementsByTagName('html');

    if (flag.lang === 'ar') {
      body[0].setAttribute('dir', 'rtl');
      this.dir = 'rtl';
    } else {
      body[0].setAttribute('dir', 'ltr');
      this.dir = 'ltr';
    }
  }
}
