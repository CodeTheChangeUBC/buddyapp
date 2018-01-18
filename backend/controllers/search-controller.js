const client = require('./../server.js');

module.exports.search=function(req,res) {
	var data={
    "user_id":req.body.user_id,
    "gender":req.body.gender,
    "gender_pref":req.body.gender_pref,
    "time_start":req.body.time_start,
    "time_end":req.body.time_end,
    "time_created":req.body.time_created,
    "size":req.body.size,
    "start_loc":req.body.start_loc,
    "dest_lat":req.body.dest_lat,
    "dest_lon":req.body.dest_long,
    "identifying_info":req.body.identifying,
    "walk_alone":req.body.walk_alone,
  }
  var text = 'INSERT INTO search(user_id, gender, gender_pref, time_start, time_end, time_created, size, start_loc, dest_lat, dest_lon, identifying_info, walk_alone) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
  var values = [data.user_id, data.gender, data.gender_pref, data.time_start, data.time_end, data.time_created, data.size, data.start_loc, data.dest_lat, data.dest_lon, data.identifying_info, data.walk_alone];
	//TODO: Fix insert of pw_hash and salt. Right now it only accepts a number with one digit.
	client.query(text, values, 
		    function(error,results,fields) {
			if(error) {
				console.log("error occurred during search request", error);
				res.json({
					status:false,
					message:'there was some error with search query'
				})
			}else {
				res.json({
					status:true,
					data:results,
					message:'Search request successful'
				})
			}
		});
}