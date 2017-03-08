import { Component, ViewChild } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})
export class Maps {

  @ViewChild('map') mapElement;
  map: any;


  constructor(public navCtrl: NavController) {
    
  }

ionViewDidLoad(){
  this.initMap();
}

initMap(){

  Geolocation.getCurrentPosition().then((position) => {

  

  let latLng = new google.maps.LatLng(49.265661, -123.250332);

  let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

}, (err) => {
  console.log(err);
});
}

addMarker(){
 
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
 
  let content = "<h4>Information!</h4>";          
 
  this.addInfoWindow(marker, content);
 
}

addInfoWindow(marker, content){
 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
 
}

}