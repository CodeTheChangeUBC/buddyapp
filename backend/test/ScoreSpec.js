var chai = require('chai');
var should = chai.should();
// var Person = require('../score.js');
var score = require('../score.js');

var count = 0;

function Person(gender, gender_pref, time_start, time_end, start_lat, start_long, dest_lat, dest_long, avg_rating) {
    this.gender = gender;
    this.gender_pref = gender_pref;
    this.time_start = new Date(time_start);
    this.time_end = new Date(time_end);
    this.start_lat = start_lat;
    this.start_long = start_long;
    this.dest_lat = dest_lat;
    this.dest_long = dest_long;
    this.avg_rating = avg_rating;
}

describe('ScoreSpec', function() {

    it('should return negative infinity for non-matching gender preferences', function()  {
        var person1 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.987, -130.123, 48.193, -130.122, 5);
        var person2 = new Person("male", "male", "2017-10-19 19:00", "2017-10-19 21:00", 49.987, -130.122, 48.193, -130.122, 5);
/*        console.log("gender1", person1.gender);
        console.log("gender2", person2.gender);*/
        var value = score(person1, person2);
        var expectedValue = Number.NEGATIVE_INFINITY;
        console.log("Value for test " + count++ + ": "+ value);
        value.should.equal(expectedValue);
    });

    it('should return negative infinity for non-overlapping departure window', function()  {
        var person1 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 20:00", 49.987, -130.123, 48.193, -130.122, 5);
        var person2 = new Person("male", "male", "2017-10-19 21:00", "2017-10-19 22:00", 49.987, -130.122, 48.193, -130.122, 5);
        var value = score(person1, person2);
/*        console.log("time_start1 " + person1.time_start);
        console.log("time_end1 " + person1.time_end);
        console.log("time_start2 " + person2.time_start);
        console.log("time_end2 " + person2.time_end);*/
        var expectedValue = Number.NEGATIVE_INFINITY;
        console.log("Value for test " + count++ + ": "+ value);
        value.should.equal(expectedValue);
    });

    it('should return positive infinity for perfect match', function()  {
        var person1 = new Person("female", "female", "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.987, -130.123, 48.193, -130.122, 5);
        var value = score(person1, person1);
/*        console.log("gender1", person1.gender);
        console.log("time_start " + person1.time_start);
        console.log("time_end " + person1.time_end);*/
        var value = score(person1, person1);
        var expectedValue = Number.POSITIVE_INFINITY;
        console.log("Value for test " + count++ + ": "+ value);
        value.should.equal(expectedValue);
    });

    it('should return high score for compatible gender pref and short distance from each other and destination', function()  {
        var person1 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.987, -130.123, 48.193, -130.122, 5);
        var person2 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.986, -130.122, 48.190, -130.121, 5);
        /*        console.log("gender1", person1.gender);
                console.log("gender2", person2.gender);*/
        var value = score(person1, person2);
        // var expectedValue = Number.NEGATIVE_INFINITY;
        console.log("Value for test " + count++ + ": "+ value);
        // value.should.equal(expectedValue);
        expect(value).to.be.within(0, Number.POSITIVE_INFINITY);
    });

    it('should return low score for compatible gender pref and large distance from each other and destination', function()  {
        var person1 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 50.987, -130.123, 49.193, -130.122, 5);
        var person2 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.986, -130.122, 48.190, -130.121, 5);
        /*        console.log("gender1", person1.gender);
                console.log("gender2", person2.gender);*/
        var value = score(person1, person2);
        // var expectedValue = Number.NEGATIVE_INFINITY;
        console.log("Value for test " + count++ + ": "+ value);
        // value.should.equal(expectedValue);
        expect(value).to.be.within(0, Number.POSITIVE_INFINITY);
    });



});
