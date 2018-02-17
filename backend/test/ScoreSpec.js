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

     it('should return 1 for match between the same person', function()  {
        var person1 = new Person("female", "female", "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.987, -130.123, 48.193, -130.122, 5);
        var value = score(person1, person1);
        var value = score(person1, person1);
        var expectedValue = 1;
        value.should.equal(expectedValue);
        });
         
     it('should return 1 for match between two people who match gender preferences, overlap in departure window, the same average rating, and taking the exact same route', function() {
        var person1 = new Person("female", "female", "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.987, -130.123, 48.193, -130.122, 5);
        var person2 = new Person("female", "female", "2017-10-19 18:00:00", "2017-10-19 20:00:00", 49.987, -130.123, 48.193, -130.122, 5);
        var value = score(person1, person2);
        var expectedValue = 1;
        value.should.equal(expectedValue);
        
        var person3 = new Person("male", "male", "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.987, -130.123, 48.193, -130.122, 5);
        var person4 = new Person("male", "male", "2017-10-19 18:00:00", "2017-10-19 20:00:00", 49.987, -130.123, 48.193, -130.122, 5);
        var value = score(person3, person4);
        var expectedValue = 1;
        value.should.equal(expectedValue);
        });
         
    it('should return negative infinity for non-matching gender preferences', function()  {
        var person1 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.987, -130.123, 48.193, -130.122, 5);
        var person2 = new Person("male", "male", "2017-10-19 19:00", "2017-10-19 21:00", 49.987, -130.122, 48.193, -130.122, 5);
        var value = score(person1, person2);
        var expectedValue = Number.NEGATIVE_INFINITY;
        console.log("Value for test " + count++ + ": "+ value);
        value.should.equal(expectedValue);
    });

    it('should return negative infinity for non-overlapping departure window', function()  {
        var person1 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 20:00", 49.987, -130.123, 48.193, -130.122, 5);
        var person2 = new Person("male", "male", "2017-10-19 21:00", "2017-10-19 22:00", 49.987, -130.122, 48.193, -130.122, 5);
        var value = score(person1, person2);
        var expectedValue = Number.NEGATIVE_INFINITY;
        value.should.equal(expectedValue);
    });
         
     it('should decrease as average rating becomes more different', function() {
         var person1 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.987, -130.123, 48.193, -130.122, 4.6);
         var person2 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.987, -130.123, 48.193, -130.122, 4.6);
         var value1 = score(person1, person2);
         value1.should.be.within(0, Number.POSITIVE_INFINITY);
         
         var person3 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.987, -130.123, 48.193, -130.122, 3.6);
         var person4 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.987, -130.123, 48.193, -130.122, 2.6);
         var value2 = score(person3, person4);
         value2.should.be.below(value1);
         
         var person5 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.987, -130.123, 48.193, -130.122, 4.6);
         var person6 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.987, -130.123, 48.193, -130.122, 2.6);
         var value3 = score(person5, person6);
         value3.should.be.below(value2);
     });

    it('should return positive infinity for perfect match', function()  {
        var person1 = new Person("female", "female", "2017-10-19 19:00:00", "2017-10-19 20:00:00", 49.987, -130.123, 48.193, -130.122, 5);
        var value = score(person1, person1);
        var expectedValue = Number.POSITIVE_INFINITY;
        console.log("Value for test " + count++ + ": "+ value);
        value.should.equal(expectedValue);
    });

    it('score should decrease as distance from each other increases', function()  {
        var person1 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.987, -130.123, 48.193, -130.122, 5);
        var person2 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.986, -130.122, 48.190, -130.121, 5);
        var value1 = score(person1, person2);
        // var expectedValue = Number.NEGATIVE_INFINITY;
        console.log("Value for test " + count++ + ": "+ value1);
        // value.should.equal(expectedValue);
        value1.should.be.within(0, Number.POSITIVE_INFINITY);

      var person3 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 50.987, -130.123, 49.193, -130.122, 5);
      var person4 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.986, -130.122, 48.190, -130.121, 5);

      var value2 = score(person3, person4);
      // var expectedValue = Number.NEGATIVE_INFINITY;
      console.log("Value for test " + count++ + ": "+ value2);
      // value.should.equal(expectedValue);
      value2.should.be.below(value1);

      var person5 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 51.987, -130.123, 49.193, -130.122, 5);
      var person6 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.986, -130.122, 48.190, -130.121, 5);
      /*        console.log("gender1", person1.gender);
              console.log("gender2", person2.gender);*/
      var value3 = score(person5, person6);
      // var expectedValue = Number.NEGATIVE_INFINITY;
      console.log("Value for test " + count++ + ": "+ value3);
      // value.should.equal(expectedValue);
      value3.should.be.below(value2);
    });


    it('score should decrease as distance from each other increases', function()  {
       // both people going from IKB to Vanier
        var person1 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.2676715, -123.2523644, 49.2647381, -123.258673, 5);
        var person2 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.2676715, -123.2523644, 49.2647381, -123.258673, 5);
        var value1 = score(person1, person2);
        value1.should.be.within(0, Number.POSITIVE_INFINITY);

       // both leaving from IKB, one going to Vanier and one going to Totem Park
        var person3 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.2676715, -123.2523644, 49.2647381, -123.258673, 5);
        var person4 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.2676715, -123.2523644, 49.2580479, -123.2530564, 5);
        var value2 = score(person3, person4);
        value2.should.be.below(value1);

       // one leaving from Koerner and going to Vanier, another leaving from IKB and going to Totem Park
        var person5 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.2681686, -123.2577932, 49.2647381, -123.258673, 5);
        var person6 = new Person("female", "female", "2017-10-19 19:00", "2017-10-19 21:00", 49.2676715, -123.2523644, 49.2580479, -123.2530564, 5);
        var value3 = score(person5, person6);
        value3.should.be.below(value2);
    });
});
