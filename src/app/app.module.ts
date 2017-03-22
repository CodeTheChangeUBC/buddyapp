import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { TripPage } from '../pages/trip/trip';
import { RatingPage } from '../pages/rating/rating';
import { SafetyCheckinPage } from '../pages/safety-checkin/safety-checkin';
import { MatchPage } from '../pages/match/match';
import { CancelPage } from '../pages/cancel/cancel';
import { ContactPage } from '../pages/contact/contact';
import { DistressPage } from '../pages/distress/distress';
import { RegisterPage } from '../pages/register/register';
import { InTransitPage } from '../pages/in-transit/in-transit';
import { BookedPage } from '../pages/booked/booked';
import { LandingPage } from '../pages/landing/landing';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    TripPage,
    RatingPage,
    RegisterPage,
    SafetyCheckinPage,
    TabsPage,
    MatchPage,
    CancelPage,
    ContactPage,
    DistressPage,
    InTransitPage,
    BookedPage,
    LandingPage,
    LoginPage,
    AboutPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    TripPage,
    RatingPage,
    RegisterPage,
    SafetyCheckinPage,
    TabsPage,
    MatchPage,
    CancelPage,
    ContactPage,
    DistressPage,
    InTransitPage,
    BookedPage,
    LandingPage,
    LoginPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
