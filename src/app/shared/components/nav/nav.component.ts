import { AuthDialogService } from './../../services/auth-dialog.service';
import { AuthService } from './../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  direction = localStorage.getItem('direction');
  userSubscribtions$: Subscription;
  flag: any;
  flags: any;
  user: any;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public translate: TranslateService,
    private authService: AuthService,
    private dialog: AuthDialogService,
  ) {}

  ngOnInit(): void {
    this.userSubscribtions$ = this.authService.user.pipe(first()).subscribe((authUser) => {
      this.authService.getUser(authUser.uid).subscribe((user) => {
        this.user = user;
        if (user.user_app_language === 'ar') {
          this.direction = 'rtl';
          localStorage.setItem('direction', this.direction);
          this.flags =  [
            { name: 'English', image: 'assets/images/flags/gb.svg', lang: 'en', dir: 'ltr', checked: false },
            { name: 'العربية', image: '../assets/icons/SAUDI ARABIA.svg', lang: 'ar', dir: 'rtl', checked: true},
          ];
          this.flag = this.flags[1];
          this.translate.use('ar');
        } else {
          this.direction = 'ltr';
          localStorage.setItem('direction', this.direction);
          this.flags =  [
            { name: 'العربية', image: '../assets/icons/SAUDI ARABIA.svg', lang: 'ar', dir: 'rtl', checked: false},
            { name: 'English', image: 'assets/images/flags/gb.svg', lang: 'en', dir: 'ltr', checked: true },
          ];
          this.flag = this.flags[1];
          this.translate.use('en');
        }
      });
    });
  }
  changeDir(): void {
    this.direction = this.direction === 'rtl' ? 'ltr' : 'rtl';
    console.log(this.direction);
    this.translate.use('ar');
  }
  changeLang(flag): void {
    this.flag = flag;
    this.direction = flag.dir;
    localStorage.setItem('direction', this.direction);
    this.translate.use(flag.lang);
    if (this.user) {
      this.authService.updateUserLang(flag.lang, this.user.uid);
    }
  }

  ngOnDestroy(): void {
    this.userSubscribtions$.unsubscribe();
  }

  login(): void {
    this.dialog.openLoginDialog();
  }
}
