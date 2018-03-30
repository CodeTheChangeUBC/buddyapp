var chai = require('chai');
var should = chai.should();
// var Person = require('../score.js');
var s = require('../score.js');
var Person = require('../person.js');

describe('ScoreSpec', function() {
// 0 no preference / do not wish to share / other, 1 male, 2 female
    it('should return 1 for match between the same person', function()  {
        var person1 = new Person(1, 2, "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.987, -130.123, 48.193, -130.122, 1, 2, 2, 5.0, null);
        var value = s.score(person1, person1);
        var expectedValue = 1;
        value.should.equal(expectedValue);
    });

    it('should return 1 for match between two people who match gender preferences, overlap in departure window, the same average rating, and taking the exact same route', function() {
        var person1 = new Person(1, 2, "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.987, -130.123, 48.193, -130.122, 1, 2, 2, 5.0, null);
        var person2 = new Person(1, 2, "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.987, -130.123, 48.193, -130.122, 1, 2, 2, 5.0, null);
        var value = s.score(person1, person2);
        var expectedValue = 1;
        value.should.equal(expectedValue);

        var person3 = new Person(1, 1, "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.987, -130.123, 48.193, -130.122, 1, 1, 2, 5.0, null);
        var person4 = new Person(1, 1, "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.987, -130.123, 48.193, -130.122, 1, 1, 2, 5.0, null);
        var value = s.score(person3, person4);
        var expectedValue = 1;
        value.should.equal(expectedValue);
    });

    it('should return negative infinity for non-matching gender preferences', function()  {
        var person1 = new Person(1, 1, "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.987, -130.123, 48.193, -130.122, 1, 1, 2, 5.0, null);
        var person2 = new Person(1, 2, "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.987, -130.123, 48.193, -130.122, 1, 2, 2, 5.0, null);
        var value = s.score(person1, person2);
        var expectedValue = Number.NEGATIVE_INFINITY;
        value.should.equal(expectedValue);
    });

    it('should return negative infinity for non-overlapping departure window', function()  {
        var person1 = new Person(1, 2, "2017-10-19 19:00", "2017-10-19 20:00", 49.987, -130.123, 48.193, -130.122, 1, 2, 2, 5.0, null);
        var person2 = new Person(1, 2, "2017-10-19 21:00", "2017-10-19 22:00", 49.987, -130.123, 48.193, -130.122, 1, 2, 2, 5.0, null);
        var value = s.score(person1, person2);
        var expectedValue = Number.NEGATIVE_INFINITY;
        value.should.equal(expectedValue);
    });

    it('should decrease as average rating becomes more different', function() {
        var person1 = new Person(1, 2, "2017-10-19 19:00", "2017-10-19 20:00", 49.987, -130.123, 48.193, -130.122, 1, 2, 2, 4.6, null);
        var person2 = new Person(1, 2, "2017-10-19 19:00", "2017-10-19 20:00", 49.987, -130.123, 48.193, -130.122, 1, 2, 2, 4.6, null);
        var value1 = s.score(person1, person2);
        value1.should.be.within(0, Number.POSITIVE_INFINITY);

        var person3 = new Person(1, 2, "2017-10-19 19:00", "2017-10-19 20:00", 49.987, -130.123, 48.193, -130.122, 1, 2, 2, 3.6, null);
        var person4 = new Person(1, 2, "2017-10-19 19:00", "2017-10-19 20:00", 49.987, -130.123, 48.193, -130.122, 1, 2, 2, 2.6, null);
        var value2 = s.score(person3, person4);
        value2.should.be.below(value1);

        var person5 = new Person(1, 2, "2017-10-19 19:00", "2017-10-19 20:00", 49.987, -130.123, 48.193, -130.122, 1, 2, 2, 4.6, null);
        var person6 = new Person(1, 2, "2017-10-19 19:00", "2017-10-19 20:00", 49.987, -130.123, 48.193, -130.122, 1, 2, 2, 2.6, null);
        var value3 = s.score(person5, person6);
        value3.should.be.below(value2);
    });

    it('score should decrease as distance from each other increases', function()  {
        var person1 = new Person(1, 2, "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.987, -130.123, 48.193, -130.122, 1, 2, 2, 5.0, null);
        var person2 = new Person(1, 2, "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.986, -130.122, 48.190, -130.121, 1, 2, 2, 5.0, null);
        var value1 = s.score(person1, person2);
        value1.should.be.within(0, Number.POSITIVE_INFINITY);

        var person3 = new Person(1, 2, "2017-10-19 19:00:00", "2017-10-19 20:00:00", 50.987, -130.123, 49.193, -130.122, 1, 2, 2, 5.0, null);
        var person4 = new Person(1, 2, "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.986, -130.122, 48.190, -130.121, 1, 2, 2, 5.0, null);
        var value2 = s.score(person3, person4);
        value2.should.be.below(value1);

        var person5 = new Person(1, 2, "2017-10-19 19:00:00", "2017-10-19 20:00:00", 51.987, -130.123, 49.193, -130.122, 1, 2, 2, 5.0, null);
        var person6 = new Person(1, 2, "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.986, -130.122, 48.190, -130.121, 1, 2, 2, 5.0, null);
        var value3 = s.score(person5, person6);
        value3.should.be.below(value2);
    });


    it('score should decrease as distance from each other increases', function()  {
        // both people going from IKB to Vanier
        var person1 = new Person(1, 2, "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.2676715, -123.2523644, 49.2647381, -123.258673, 1, 2, 2, 5.0, null);
        var person2 = new Person(1, 2, "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.2676715, -123.2523644, 49.2647381, -123.258673, 1, 2, 2, 5.0, null);
        var value1 = s.score(person1, person2);
        console.log("score: " + value1);
        value1.should.be.within(0, Number.POSITIVE_INFINITY);

        // both leaving from IKB, one going to Vanier and one going to Totem Park
        var person3 = new Person(1, 2, "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.2676715, -123.2523644, 49.2647381, -123.258673, 1, 2, 2, 5.0, null);
        var person4 = new Person(1, 2, "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.2676715, -123.2523644, 49.2580479, -123.2530564, 1, 2, 2, 5.0, null);
        var value2 = s.score(person3, person4);
        console.log("score: " + value2);
        value2.should.be.below(value1);

        // one leaving from Koerner and going to Vanier, another leaving from IKB and going to Totem Park
        var person5 = new Person(1, 2, "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.2681686, -123.2577932, 49.2647381, -123.258673, 1, 2, 2, 5.0, null);
        var person6 = new Person(1, 2, "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.2676715, -123.2523644, 49.2580479, -123.2530564, 1, 2, 2, 5.0, null);
        var value3 = s.score(person5, person6);
        console.log("score: " + value3);
        value3.should.be.below(value2);
    });
});
