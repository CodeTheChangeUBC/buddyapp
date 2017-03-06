import { Component, ViewChild } from '@angular/core';

import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement;
  map: any;

  constructor(public navCtrl: NavController) {
    
  }

ionViewDidLoad(){
  this.initMap();
}

initMap(){

  let latLng = new google.maps.LatLng(49.265661, -123.250332);

  let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

}

}