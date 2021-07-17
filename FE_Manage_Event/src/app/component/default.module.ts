import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from '../shared/user/header/header.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { CvComponent } from './user/cv/cv.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';
import { FooterComponent } from '../shared/user/footer/footer.component';
import { ArtistComponent } from './admin/artist/artist.component';
import { BookingComponent } from './admin/booking/booking.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    HomeComponent,
    CvComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    AdminProfileComponent,
    UserProfileComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    ArtistComponent,
    BookingComponent
    
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    
  ],
})
export class DefaultModule { }
