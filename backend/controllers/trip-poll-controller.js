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

  client.query(query);
  //next steps: we plan on implementing the following
  //1) send query
  //2) receive response (the value of status)
  //3) set pending to TRUE if status is 0
  return pending;
}
