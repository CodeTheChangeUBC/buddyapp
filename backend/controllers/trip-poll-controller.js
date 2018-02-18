/*
* Check user status
* Look for value of 0 (pending search)
*/
const client = require('./../server.js');

//assume req is a user_id
// searches through trip to check whether a user has been put in a trip that is now pending
module.exports.tripPoll=function(id, res) {
  var pending = false;
  // pending = am I in a trip?
  /** DO SOMETHING TO CHECK IF PENDING**/
  const query = `SELECT * FROM public.trip WHERE user_id = ${id} AND status = 0`;

  client.query(query, (err,res) => {
    if (err) {
      console.log("error", error);
      res.json({
        status: false,
        message: 'there was some error determining whether user is in trip'
      })
    } else {
      // TODO verify response when no result matching in database
      if (res.rows[0] != NULL) {
        pending = true;
      }
      res.json({
        status: true,
        data: results,
        message: 'find succcessful'
      })
    }
  })

  // we have to set pending somehow
  return pending;
}
