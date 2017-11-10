const client = require('./../server.js');

module.exports.register=function(req,res) {
	var users={
		"username":req.body.username,
		"pw_hash":req.body.pw_hash,
		"salt":req.body.salt,
		"first_name":req.body.first_name,
		"last_name":req.body.last_name,
		"gender":req.body.gender,
		"email":req.body.email
	}
	//TODO: Fix insert of pw_hash and salt. Right now it only accepts a number with one digit.
	client.query('INSERT INTO users(username, pw_hash, salt, first_name, last_name, gender, email) values($1, $2, $3, $4, $5, $6, $7)',
		    [users.username, users.pw_hash, users.salt, users.first_name, users.last_name, users.gender, users.email], 
		    function(error,results,fields) {
			if(error) {
				console.log("error occurred", error);
				res.json({
					status:false,
					message:'there was some error with query'
				})
			}else {
				res.json({
					status:true,
					data:results,
					message:'user registered successfully'
				})
			}
		});
}
