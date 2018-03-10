/**
 * Computes a score for two people based on how well-matched they are.
 * @param {Person} person1
 * @param {Person} person2
 * @return {Number} score
 *      score is a number between 0 and 1, or NEGATIVE_INFINITY
 *          Number.NEGATIVE_INFINITY: means the two people are incompatible
 *          1: means the two people are a perfect match
 */
function score(person1, person2) {
    // check same person
    if (person1 == person2) {
        return 1;
    }

    // GENDER MATCH
    var genderMatch = ((person1.genderPref === person2.gender || person1.genderPref === 0) &&
                        (person1.gender === person2.genderPref || person2.genderPref === 0));

    if (!genderMatch) return Number.NEGATIVE_INFINITY;

    // DEPARTURE OVERLAP
    var departureOverlap = ((person1.timeStart <= person2.timeEnd && person2.timeStart <= person1.timeEnd));

    if (!departureOverlap) return Number.NEGATIVE_INFINITY;

    // RATING MATCH
    // between 0 (bad) and 1 (good)
    var ratingScore = (5 - Math.abs(person1.avgRating - person2.avgRating))/5;

    // TRIP OVERLAP
    // between 0 (bad) and 1 (good)
    var x1 = getDistanceFromLatLonInKm(person1.startLat,person1.startLong,person2.startLat,person2.startLong)      // distance between person1 start and person2 start
    var x2 = getDistanceFromLatLonInKm(person1.startLat,person1.startLong,person1.destLat,person1.destLong)        // distance between person1 start and person1 end
    var x3 = getDistanceFromLatLonInKm(person2.startLat,person2.startLong,person1.destLat,person1.destLong)        // distance between person2 start and person1 end
    var x4 = getDistanceFromLatLonInKm(person1.startLat,person1.startLong,person2.destLat,person2.destLong)        // distance between person1 start and person2 end
    var x5 = getDistanceFromLatLonInKm(person2.startLat,person2.startLong,person2.destLat,person2.destLong)        // distance between person2 start and person2 end
    var x6 = getDistanceFromLatLonInKm(person1.destLat,person1.destLong,person2.destLat,person2.destLong)          // distance between person1 end and person2 end

    // calculate the shortest trip where two people meet at one start location, leave each other at one dest location
    var distTotal = x1 + x6 + Math.min(x2,x4,x3,x5);

    // compute ratio of distance travelled for each person travelling independently to two people taking trip together
    var distanceMatch = (x2+x5)/(2*distTotal);

    // COMPUTE SCORE
    // between 0 (bad) and 1 (good)
    return ratingScore * 0.2 + distanceMatch * 0.8;
}

module.exports = score;

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}
