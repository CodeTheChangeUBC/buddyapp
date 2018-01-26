/*
* Check user status
* Look for value of 0 (pending search)
*/
const client = require('./../server.js');

//assume req is a user_id
module.exports.tripPoll=function(req, res) {
  var pending = "0";
  /** DO SOMETHING TO CHECK IF PENDING**/
  const query = "SEARCH...";
  client.query(query);

  return pending;
}
