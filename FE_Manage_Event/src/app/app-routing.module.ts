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

const routes: Routes = [
    {
      path:'home', component: HomeComponent
    },
    {
      path:'user',
      component: UserLayoutComponent,

      children: [
        {
          path: 'cv',
          component: CvComponent
        },
        {
          path: 'user-profile',
          component: UserProfileComponent
        }
      ]
    },
    {
      path:'admin',
      component: AdminLayoutComponent,

      children: [
        // {
        //   path: '',
        //   component: DashboardComponent
        // },
        {
          path: 'dashboard',
          component: DashboardComponent
        },
        {
          path: 'book',
          component: BookingComponent
        },
        {
          path: 'artist',
          component: ArtistComponent
        },
        // {
        //   path: 'revenue',
        //   component: RevenueComponent
        // }
        {
          path: 'admin-profile',
          component: AdminProfileComponent
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
