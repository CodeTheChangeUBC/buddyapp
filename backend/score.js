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
 * @constructor
 */
function Person(gender, gender_pref, time_start, time_end, start_lat, start_long, dest_lat, dest_long) {
    this.gender = gender;
    this.gender_pref = gender_pref;
    this.time_start = time_start;
    this.time_end = time_end;
    this.start_lat = start_lat;
    this.start_long = start_long;
    this.dest_lat = dest_lat;
    this.dest_long = dest_long;
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
    return Number.NEGATIVE_INFINITY;
}

