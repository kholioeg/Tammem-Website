import { AddCampaignComponent } from './real-estate/add-campaign/add-campaign.component';
import { AddBlogComponent } from './blogs/add-blog/add-blog.component';
import { BlogComponent } from './blogs/blog/blog.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { SpecialOffersComponent } from './special-offers/special-offers.component';
import { MapComponent } from './real-estate/map/map.component';
import { ServicesComponent } from './services-component/services.component';
import { AuthguardService } from './shared/guards/authguard.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DetailsComponent } from './real-estate/details/details.component';
import { LoginComponent } from './shared/components/auth/login/login.component';
import { EditComponent } from './real-estate/edit/edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './real-estate/add/add.component';
import { RealEstateComponent } from './real-estate/real-estate.component';
import { EditProfileComponent } from './user-profile/edit-profile/edit-profile.component';
import { FinancialMovementComponent } from './user-profile/financial-movement/financial-movement.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: RealEstateComponent,
  },
  {
    path: 'home/map',
    component: MapComponent,
  },
  {
    path: 'realestate/add',
    component: AddComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'edit-real-estate/:id',
    component: EditComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'home/listings/:id',
    component: DetailsComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'services',
    component: ServicesComponent,
    canActivate: [AuthguardService],
  },

  {
    path: 'special-offers',
    component: SpecialOffersComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'budgets',
    component: BudgetsComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'blogs',
    component: BlogsComponent,
    canActivate: [AuthguardService],
    children: [
      {path: 'blog/:id', component: BlogComponent},
    ]
  },
  {
    path: 'blogs/add',
    component: AddBlogComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'home/add-campaign',
    component: AddCampaignComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'profile/financial-movement',
    component: FinancialMovementComponent,
    canActivate: [AuthguardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
