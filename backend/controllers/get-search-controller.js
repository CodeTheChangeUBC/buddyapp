var client = require('./../server.js');
var score = require('./../score.js');
var p = require('./../person.js');
var safewalkHubDict = require('./../safewalkHubDict.js');
var search = require("./../search.js");
//Grabs search data from db and returns an array of User objects populated with score data.
module.exports.getSearchData = function(){
	client.query("SELECT public.users.gender, public.search.* FROM public.users INNER JOIN public.search ON public.users.id = public.search.user_id WHERE public.search.time_end > CURRENT_TIMESTAMP AND public.search.status = 0").then(res => {
		var rows = res.rows;
		//array of Persons
		var persons = new Array();
		var personScores = new Array();
		if(rows.length > 0){
			for(var i = 0; i < rows.length; i++){
				personScores.push(new Array());
			}
			for(var i = 0; i < rows.length; i++){
				var r = rows[i];
				var lat1 = safewalkHubDict[r.start_loc].lat;
				var lon1 = safewalkHubDict[r.start_loc].lon;
				var p = new p.Person(r.user_id, r.gender, r.time_start, r.time_end, lat1, lon1, r.dest_lat, r.dest_lon, r.walk_alone, r.gender_pref, r.minSize, 0, []);
				persons.push(p);
			}
			//populate personScores
			for(var i = 0; i < rows.length; i++){
				//The diagonal is already a 100% match and ignored
				personScores[i][i] = Number.MAX_VALUE;
				for(var o = i+1, o < rows.length; o++){
					var p1 = persons[i];
					var p2 = persons[o];
					var s = score.score(p1, p2);
					personScores[i][o] = s;
					personScores[o][i] = s;
				}
			}
			for(var i = 0; i < rows.length; i++){
				persons[i].data = personScores[i];
			}
		}
		return persons;
	}).catch(err => {
		console.log("Could not get search data from db:");
		console.log(err);
	});
}