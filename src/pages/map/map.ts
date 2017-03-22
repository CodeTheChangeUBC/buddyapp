import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TripPage } from '../trip/trip';

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  selectDestination(destination) {
    this.navCtrl.push(TripPage, {destination: destination});
  }

}
