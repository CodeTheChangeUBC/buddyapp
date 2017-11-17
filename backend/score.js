"use strict";

/**
 * Constructor for a person.
 * @param gender
 * @param gender_pref
 * @param time_start
 * @param time_end
 * @param start_lat
 * @param start_long
 * @param dest_lat
 * @param dest_long
 * @param avg_rating
 * @constructor
 */
function Person(gender, gender_pref, time_start, time_end, start_lat, start_long, dest_lat, dest_long, avg_rating) {
  this.gender = gender;
  this.gender_pref = gender_pref;
  this.time_start = time_start;
  this.time_end = time_end;
  this.start_lat = start_lat;
  this.start_long = start_long;
  this.dest_lat = dest_lat;
  this.dest_long = dest_long;
  this.avg_rating = avg_rating;
}

/**
 * Computes a score for two people based on how well-matched they are.
 * @param {Person} person1
 * @param {Person} person2
 * @return {Number} score
 *      score is a number between Number.NEGATIVE_INFINITY and 1
 *          Number.NEGATIVE_INFINITY: means the two people are incompatible
 *          1: means the two people are a perfect match
 */
function score(person1, person2) {
  // stub
  var gender_match = ((person1.gender_pref === person2.gender || person1.genderpref === 0) &&
    (person1.gender === person2.gender_pref || person2.genderpref === 0));

  if (!gender_match) return Number.NEGATIVE_INFINITY;

  var departure_overlap = ((person1.time_start <= person2.time_end && person2.start_time <= person1.time_end));

  // should we allow people to wait if they want to?
  if (!departure_overlap) return Number.NEGATIVE_INFINITY;

  var rating_score = 5 - Math.abs(person1.avg_rating - person2.avg_rating);

  var distance_overlap = 0;

  return Number.NEGATIVE_INFINITY;
}

// https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
