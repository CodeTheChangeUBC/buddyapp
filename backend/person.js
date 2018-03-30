"use strict";
/**
 * Constructor for a person.
 * @param <Number> userId  
 * @param <Number> gender
 * @param <String> (UTC timestamp) timeStart
 * @param <String> (UTC timestamp) timeEnd
 * @param <Number> startLat
 * @param <Number> startLong
 * @param <Number> destLat
 * @param <Number> destLong
 * @param <Number> walkAlone
 * @param <Number> genderPref
 * @param <Number> minSize
 * @param <Number> avgRating
 * @param <Array<Number>> data
 * @constructor
 */
function Person(userId, gender, timeStart, timeEnd, startLat, startLong, destLat, destLong, walkAlone, genderPref, minSize, avgRating, data) {
    this.userId = userId;
    this.gender = gender;
    this.timeStart = new Date(timeStart);
    this.timeEnd = new Date(timeEnd);
    this.startLat = startLat;
    this.startLong = startLong;
    this.destLat = destLat;
    this.destLong = destLong;
    this.walkAlone = walkAlone;
    this.genderPref = genderPref;
    this.size = minSize;
    this.avgRating = avgRating;
    this.data = data;			//userScores
}

module.exports = Person;
