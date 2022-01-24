import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { ClientComponent } from './pages/client/client.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ContentComponent } from './pages/content/content.component';
import { ContentsComponent } from './pages/contents/contents.component';
import { CounsellorComponent } from './pages/counsellor/counsellor.component';
import { CounsellorsComponent } from './pages/counsellors/counsellors.component';
import { CouponComponent } from './pages/coupon/coupon.component';
import { CouponsComponent } from './pages/coupons/coupons.component';
import { EventsComponent } from './pages/events/events.component';
import { ListenerComponent } from './pages/listener/listener.component';
import { ListenersComponent } from './pages/listeners/listeners.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { QuoteComponent } from './pages/quote/quote.component';
import { QuotesComponent } from './pages/quotes/quotes.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SideNavComponent } from './pages/side-nav/side-nav.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { TherapistComponent } from './pages/therapist/therapist.component';
import { TherapistsComponent } from './pages/therapists/therapists.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  {
    path: '', component: SideNavComponent, children: [
      { path: 'clients', component: ClientsComponent },
      { path: 'client', component: ClientComponent },
      { path: 'counsellors', component: CounsellorsComponent },
      { path: 'counsellor', component: CounsellorComponent },
      { path: 'therapists', component: TherapistsComponent },
      { path: 'therapist', component: TherapistComponent },
      { path: 'listeners', component: ListenersComponent },
      { path: 'listener', component: ListenerComponent },
      { path: 'quotes', component: QuotesComponent },
      { path: 'quote', component: QuoteComponent },
      { path: 'coupons', component: CouponsComponent },
      { path: 'coupon', component: CouponComponent },
      { path: 'contents', component: ContentsComponent },
      { path: 'content', component: ContentComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'events', component: EventsComponent },
      { path: '', redirectTo: 'clients', pathMatch: 'full' },
      { path: '**', redirectTo: 'clients' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
