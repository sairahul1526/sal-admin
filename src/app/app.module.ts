import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SideNavComponent } from './pages/side-nav/side-nav.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { CounsellorsComponent } from './pages/counsellors/counsellors.component';
import { QuotesComponent } from './pages/quotes/quotes.component';
import { QuoteComponent } from './pages/quote/quote.component';
import { CouponsComponent } from './pages/coupons/coupons.component';
import { CouponComponent } from './pages/coupon/coupon.component';
import { OrdinalPipe } from './pipes/ordinal.pipe';
import { DateTransformPipe } from './pipes/date-transform.pipe';
import { ReportsComponent } from './pages/reports/reports.component';
import { ContentsComponent } from './pages/contents/contents.component';
import { ContentComponent } from './pages/content/content.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { EventsComponent } from './pages/events/events.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SideNavComponent,
    ClientsComponent,
    CounsellorsComponent,
    QuotesComponent,
    QuoteComponent,
    CouponsComponent,
    CouponComponent,
    OrdinalPipe,
    DateTransformPipe,
    ReportsComponent,
    ContentsComponent,
    ContentComponent,
    AppointmentsComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
