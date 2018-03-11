var client = require("./../server.js");

//Function to add a row in the Trip table for every User object in group using a calculated start time.
module.exports.addTrips = function (group) {
	var maxStart = group[0].timeStart;        // max start - latest start time
	var minEnd = group[0].timeEnd;            // min end - earliest end time
	var allUserIds = "";
	for (var i = 0; i < group.length; i++) {
		var person = group[i];
		if (person.timeStart > maxStart) {
			maxStart = person.timeStart;
		}
		if (person.timeEnd < minEnd) {
			minEnd = person.timeEnd;
		}

		// create the list of all user_ids for the trip as a string
		allUserIds = allUserIds + person.userId.toString() + ",";
	}
	allUserIds = allUserIds.slice(0, -1);

	//Split the datetime string at these characters
	var t = minEnd.split(/[- :]/);
	//Pretty sure our Postgres db doesn"t have milliseconds so I use 0
	var minEndDate = new Date(Date.UTC(t[0], t[1], t[2], t[3], t[4], t[5], 0));
	t = maxStart.split(/[- :]/);
	var maxStartDate = new Date(Date.UTC(t[0], t[1], t[2], t[3], t[4], t[5], 0));

	//Calculate the average
	//Gets difference between the minEnd and maxStart in milliseconds
	var diff = Math.abs(minEndDate - maxStartDate);
	//Average it
	diff = diff / 2;
	//Add it to maxStartDate and make the trueStartTime
	var trueStartMS = maxStartDate.getTime() + diff;
	//This is the actual start time that we send the group out at
	var trueStartTime = new Date(trueStartMS);

	const fnTripInsertion = function (error, results, fields) {
		if (error) {
			console.log("error occurred during trip insertion", error);
			res.json({
				status: false,
				message: "there was some error with insert query"
			})
		} else {
			res.json({
				status: true,
				data: results,
				message: "trip insertion successful"
			})
		}
	};

	for (let i = 0; i < group.length; i++) {
		const person = group[i];
		const trueStartTimeFormatted = trueStartTime.toISOString();
		const timeEnd = person.timeEnd;
		// TODO: do we have a proper security code?
		const securityCode = Math.floor(Math.random() * 10000);
        const status = 0;
		const userId = person.userId;

		const query = "INSERT INTO trip(time_start, time_end, security_code, status, user_ids, user_id) VALUES($1, $2, $3, $4, $5, $6)";
		const values = [trueStartTimeFormatted, timeEnd, securityCode, status, allUserIds, userId];
		
		client.query(query, values, fnTripInsertion);
	}
}
