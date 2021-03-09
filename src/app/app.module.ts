import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BidiModule } from '@angular/cdk/bidi';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { LoginComponent } from './shared/components/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RealEstateComponent } from './real-estate/real-estate.component';
import { AddComponent } from './real-estate/add/add.component';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { LocationComponent } from './real-estate/location/location.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgImageSliderModule } from 'ng-image-slider';
import { DetailsComponent } from './real-estate/details/details.component';
import { EditComponent } from './real-estate/edit/edit.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DeleteComponent } from './real-estate/delete/delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { NotAuthenticatedComponent } from './shared/components/not-authenticated/not-authenticated.component';
import { EditProfileComponent } from './user-profile/edit-profile/edit-profile.component';
import { ServicesComponent } from './services-component/services.component';
import { MapComponent } from './real-estate/map/map.component';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { AgmDrawingModule } from '@agm/drawing';
import { SpecialOffersComponent } from './special-offers/special-offers.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ButtonClickedDirective } from './shared/directives/button-clicked.directive';
import { AuthComponent } from './shared/components/auth/auth.component';
import { SignupComponent } from './shared/components/auth/signup/signup.component';
import { OtpComponent } from './shared/components/auth/otp/otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { NavComponent } from './shared/components/nav/nav.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogComponent } from './blogs/blog/blog.component';
import { AddBlogComponent } from './blogs/add-blog/add-blog.component';
import { PrivacyPolicyComponent } from './shared/components/privacy-policy/privacy-policy.component';
import { AddCampaignComponent } from './real-estate/add-campaign/add-campaign.component';
import { PlusMinusComponent } from './shared/components/plus-minus/plus-minus.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FinancialMovementComponent } from './user-profile/financial-movement/financial-movement.component';
import { RatingModule } from 'ng-starrating';




@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RealEstateComponent,
    AddComponent,
    LocationComponent,
    DetailsComponent,
    EditComponent,
    DeleteComponent,
    UserProfileComponent,
    NotAuthenticatedComponent,
    EditProfileComponent,
    ServicesComponent,
    MapComponent,
    SpecialOffersComponent,
    BudgetsComponent,
    ButtonClickedDirective,
    AuthComponent,
    SignupComponent,
    OtpComponent,
    NavComponent,
    FooterComponent,
    OrderDialogComponent,
    FilterDialogComponent,
    BlogsComponent,
    BlogComponent,
    AddBlogComponent,
    PrivacyPolicyComponent,
    AddCampaignComponent,
    PlusMinusComponent,
    FinancialMovementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BidiModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    ReCaptchaModule,
    NgxCaptchaModule,
    MatInputModule,
    FlexLayoutModule,
    MatRadioModule,
    MatCheckboxModule,
    AngularFireStorageModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA6ZMuE-Ic86oL-7FclodGcmYEve8L5Muk',
      libraries: ['geometry', 'drawing'],
    }),
    AgmDrawingModule,
    GooglePlaceModule,
    NgImageSliderModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatDialogModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    NgxPaginationModule,
    NgxIntlTelInputModule,
    NgOtpInputModule,
    HttpClientModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatRippleModule,
    MatDividerModule,
    MatSlideToggleModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    RatingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DeleteComponent, LoginComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
