var client = require('./../server.js');
var score = require('./../score.js');
var safewalkHubDict = require('./../safewalkHubDict.js');
var search = require("./../search.js");
//Grabs search data from db and returns an array of User objects populated with score data.
module.exports.getSearchData = function(){
	client.query("SELECT * FROM search").then(res => {
		var rows = res.rows
		//array of users
		var users = new Array();
		//array of userScores
		var userScores = new Array();
		if(rows.length > 0){
			//make userScores a 2d array
			for(var i = 0; i < rows.length; i++){
				userScores.push(new Array());
			}
			//populate userScores
			for(var i = 0; i < rows.length; i++){
				//The diagonal is already a 100% match and ignored
				userScores[i][i] = Number.MAX_VALUE;
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
				var r = rows[i];
				//Need start_lat and start_lon from start_loc (safewalk hub) in table
				//For now it is forestry
				var lat1 = safewalkHubDict[r.start_loc].lat;
				var lon1 = safewalkHubDict[r.start_loc].lon;
				var p1 = new Person(r.gender, r.gender_pref, r.time_start, r.time_end, lat1, lon1, r.dest_lat, r.dest_lon, 1);
				for(var o = i+1, o < rows.length; o++){
					r = rows[o];
					var lat2 = safewalkHubDict[r.start_loc].lat;
					var lon2 = safewalkHubDict[r.start_loc].lon;
					var p2 = new Person(r.gender, r.gender_pref, r.time_start, r.time_end, lat2, lon2, r.dest_lat, r.dest_lon, 1);
					var s = score.score(p1, p2);
					userScores[i][o] = s;
					userScores[o][i] = s;
				}
				//Make a new user and add it to our user array
				//TODO: Fix constructor parameters
				var u = new User(r.user_id, r.walk_alone, r.minSize, userScores[i]);
				users.push(u);
			}
		}
	});

}