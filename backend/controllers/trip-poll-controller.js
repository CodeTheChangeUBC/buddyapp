/*
* Check user status
* Look for value of 0 (pending search)
*/
const client = require('./../server.js');

//assume req is a user_id
module.exports.tripPoll=function(id, res) {
  var pending = false;
  /** DO SOMETHING TO CHECK IF PENDING**/
  const query = `SELECT public.trip.status, public.trip.user_id FROM public.trip WHERE user_id = ${id}`;

  client.query(query, function (error, results, fields) {
			if (error) {
				console.log("error occurred during trip insertion", error);
				res.json({
					status: false,
					message: 'there was some error with insert query'
				})
			} else {
				res.json({
					status: true,
					data: results,
					message: 'trip insertion successful'
				})
			}
	});

  // we have to set pending somehow
  return pending;
}
