var client = require(./../server.js);

//Function to add a row in the Trip table for every User object in group using a calculated start time.
module.exports.addTrips=function(group){
	var max_start = group[0].time_start;
	var min_end = group[0].time_end;
	for(var i = 0; i < group.length; i++){
		if(group[i].time_start > max_start){
			max_start = group[i].time_start;
		}
		if(group[i].time_end < min_end){
			min_end = group[i].time_end;
		}
	}
 	//Split the datetime string at these characters
 	var t = min_end.split(/[- :]/);
 	//Pretty sure our Postgres db doesn't have milliseconds so I use 0
 	var minEndDate = new Date(Date.UTC(t[0], t[1], t[2], t[3], t[4], t[5], 0));
 	t = max_start.split(/[- :]/);
 	var maxStartDate = new Date(Date.UTC(t[0], t[1], t[2], t[3], t[4], t[5], 0));

 	//Calculate the average
 	//Gets difference between the minEnd and maxStart in milliseconds
 	var diff = Math.abs(minEndDate - maxStartDate);
 	//Average it
 	diff = diff/2;
 	//Add it to minStartDate and make the trueStartTime
 	var trueStartMS = minStartDate.getTime() + diff;
 	var trueStartTime = new Date(trueStartMS);

	//TODO: query database to add a trip entry for all users in group
	// trueStartTime is the start time for the group but you will need to change it back into SQL format using the toISOString() method for Date objects.
	//For reference:
	/** 
 	* Constructor for a user
 	* @param {Number} userId
 	* @param {0, 1} walkAlone
 	* @param {Number} minSize
 	* @param {Array<Number>} data
 	* @param {Timestamp} time_start
 	* @param {Timestamp} time_end
 	*/

}