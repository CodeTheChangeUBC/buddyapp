var client = require('./../server.js');
var score = require('./../score.js');
var safewalkHubDict = require('./../safewalkHubDict.js');
var search = require("./../search.js");
//Grabs search data from db and returns an array of User objects populated with score data.
module.exports.getSearchData = function(){
	client.query("SELECT public.users.gender, public.search.* FROM public.users INNER JOIN public.search ON public.users.id = public.search.user_id WHERE public.search.time_end > CURRENT_TIMESTAMP").then(res => {
		var rows = res.rows;
		//array of users
		var users = new Array();
		//array of userScores
		var userScores = new Array();
		//array of Persons (so we don't need to keep making person objects)
		var persons = new Array();
		if(rows.length > 0){
			//make userScores a 2d array
			for(var i = 0; i < rows.length; i++){
				userScores.push(new Array());
			}
			for(var i = 0; i < rows.length; i++){
				var lat1 = safewalkHubDict[r.start_loc].lat;
				var lon1 = safewalkHubDict[r.start_loc].lon;
				var p = new score.Person(r.gender, r.gender_pref, r.time_start, r.time_end, lat1, lon1, r.dest_lat, r.dest_lon, 1);
				persons.push(p);
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
				var p1 = persons[i];
				for(var o = i+1, o < rows.length; o++){
					r = rows[o];
					var p2 = persons[o];
					var s = score.score(p1, p2);
					userScores[i][o] = s;
					userScores[o][i] = s;
				}
				//Make a new user and add it to our user array
				//TODO: Fix constructor parameters
				var u = new search.User(r.user_id, r.walk_alone, r.minSize, userScores[i], r.time_start, r.time_end, r.dest_lat, r.dest_long);
				users.push(u);
			}
		}
		return users;
	}).catch(err => {
		console.log("Could not get search data from db:");
		console.log(err);
	});
}