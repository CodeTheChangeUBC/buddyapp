const safewalkHubDict = require('./safewalkHubDict.js');
const person = require('./closest_hub.js');
const score = require('./score.js');

/**
 * Gets the index of the closest hub given a group of people in an array
 * @param {Array} peopleArray
 * @return {Number} index
 *      index is index of safewalkHub in safewalkHubDict that is closest to all people
 */
function get_central_hub (peopleArray) {
    var avg_lat = 0;
    var avg_lon = 0;
    var num_people = peopleArray.length;
    //Calculate avg lattitude + longitude of all grouped people
    for (var i = 0; i < num_people; i++) {
        avg_lat += peopleArray[i].startLat;
        avg_lon += peopleArray[i].startLong;
    }
    avg_lat /= num_people;
    avg_lon /= num_people;

    var closest_i = 1;
    var min_dst = getDistanceFromLatLonInKm(avg_lat, avg_lon, safewalkHubDict[1].lat, safewalkHubDict[1].lon);
    for (var i = 2; i <= safewalkHubDict.length; i++){ //Find closest dst
        var dst = getDistanceFromLatLonInKm(avg_lat, avg_lon, safewalkHubDict[i].lat, safewalkHubDict[i].lon);
        if (dst < min_dst){
            min_dst = dst;
            closest_i = i;
        }
    }
    return closest_i;
}

module.exports = central_hub;
