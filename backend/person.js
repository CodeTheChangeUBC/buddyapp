"use strict";
/**
 * Constructor for a person.
 * @param userId
 * @param gender
 * @param timeStart
 * @param timeEnd
 * @param startLat
 * @param startLong
 * @param destLat
 * @param destLong
 * @param walkAlone
 * @param genderPref
 * @param minSize
 * @param avgRating
 * @param data
 * @constructor
 */
function Person(userId, gender, timeStart, timeEnd, startLat, startLong, destLat, destLong, walkAlone, genderPref, minSize, avgRating, data) {
    this.userId = userId;
    this.gender = gender;
    this.timeStart = new Date(time_start);
    this.timeEnd = new Date(time_end);
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
