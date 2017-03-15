import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { Maps } from '../pages/maps/maps';
import { TabsPage } from '../pages/tabs/tabs';
import { TripPage } from '../pages/trip/trip';
import { LandingPage } from '../pages/landing/landing';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { BookedPage } from '../pages/booked/booked';
import { MatchPage } from '../pages/match/match';
import { SafetyCheckinPage } from '../pages/safety-checkin/safety-checkin';
import { InTransitPage } from '../pages/in-transit/in-transit';
import { DistressPage } from '../pages/distress/distress';
import { RatingPage } from '../pages/rating/rating';
import { CancelPage } from '../pages/cancel/cancel';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    Maps,
    TabsPage,
    TripPage,
    LandingPage,
    LoginPage,
    RegisterPage,
    BookedPage,
    MatchPage,
    SafetyCheckinPage,
    InTransitPage,
    DistressPage,
    RatingPage,
    CancelPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    Maps,
    TabsPage,
    TripPage,
    LandingPage,
    LoginPage,
    RegisterPage,
    BookedPage,
    MatchPage,
    SafetyCheckinPage,
    InTransitPage,
    DistressPage,
    RatingPage,
    CancelPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
