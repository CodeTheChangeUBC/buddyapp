import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { Maps } from '../pages/maps/maps';
import { TabsPage } from '../pages/tabs/tabs';
import { TripPage } from '../pages/trip/trip';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    Maps,
    TabsPage,
    TripPage
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
    TripPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
