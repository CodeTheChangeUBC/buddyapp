import {Component, ViewChild} from '@angular/core';
import {Geolocation} from 'ionic-native';
import {NavController} from 'ionic-angular';
import {TripPage} from '../trip/trip';


@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})
export class Maps {
  google: any;

  @ViewChild('map') mapElement;
  map: any;


  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap() {

    Geolocation.getCurrentPosition().then((position) => {


      let latLng = new this.google.maps.LatLng(49.265661, -123.250332);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: this.google.maps.MapTypeId.ROADMAP
      };

      this.map = new this.google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    });
  }

  addMarker() {

    let marker = new this.google.maps.Marker({
      map: this.map,
      animation: this.google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {

    let infoWindow = new this.google.maps.InfoWindow({
      content: content
    });

    this.google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  /* TODO: Pass in trip destination as an argument */
  selectDestination(destination) {
    this.navCtrl.push(TripPage, {destination: destination});
  }

}
