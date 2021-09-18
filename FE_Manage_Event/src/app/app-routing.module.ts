import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvComponent } from './component/user/cv/cv.component';
import { HomeComponent } from './component/home/home.component';
import { UserLayoutComponent } from './component/user/user-layout/user-layout.component';
import { UserProfileComponent } from './component/user/user-profile/user-profile.component';
import { AdminLayoutComponent } from './component/admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './component/admin/dashboard/dashboard.component';
import { AdminProfileComponent } from './component/admin/admin-profile/admin-profile.component';
import { BookingComponent } from './component/admin/booking/booking.component';
import { ArtistComponent } from './component/admin/artist/artist.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/authen/login/login.component';
import { RegisterComponent } from './component/authen/register/register.component';
import { AuthGuard } from './services/authen/auth.guard';
import { ForgotPasswordComponent } from './component/authen/forgot-password/forgot-password.component';
import { UserHomeComponent } from './component/user/user-home/user-home.component';
import { BlogComponent } from './component/user/blog/blog.component';

const routes: Routes = [
    {
      path:'home', component: HomeComponent,
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'forgot-password',
      component: ForgotPasswordComponent
    },
    {
      path:'user',
      component: UserLayoutComponent,
      children: [
        {
          path: 'cv',
          component: CvComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'user-profile',
          component: UserProfileComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'user-home',
          component: UserHomeComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'blog',
          component: BlogComponent,
          canActivate: [AuthGuard]
        }
      ]
    },
    {
      path:'admin',
      component: AdminLayoutComponent,

      children: [
        {
          path: 'dashboard',
          component: DashboardComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'book',
          component: BookingComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'artist',
          component: ArtistComponent,
          canActivate: [AuthGuard]
        },
        // {
        //   path: 'revenue',
        //   component: RevenueComponent
        // }
        {
          path: 'admin-profile',
          component: AdminProfileComponent,
          canActivate: [AuthGuard]
        }
      ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule, BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
