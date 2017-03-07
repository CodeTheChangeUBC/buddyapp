import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';


@Component({
    templateUrl: 'trip.html'
})

export class TripPage {
    trip;

    constructor(navParams: NavParams) {
        this.trip = navParams.get('destination');
    }
}