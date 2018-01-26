const client = require('./../server.js');

module.exports.register=function(req,res) {
	var users={
		"username":req.body.username,
		"pw_hash":req.body.pw_hash,
		"first_name":req.body.first_name,
		"last_name":req.body.last_name,
		"gender":req.body.gender,
		"email":req.body.email
	}





  // TODO verify email not already registered

  // Use bcrypt to encrypt user password, auto salting
  // in function(err, hash), hash gives hash of password
  client.bcrypt.hash(req.body.password, 10, function(err, hash) {

    if (err) {
      console.log(err, err.stack);
    } else {

      // TODO This creates a new JWT for api calls, though will need to change this to match
      // with now JWT are generated on persistent-login controller
      var token = client.jwt.sign({email: request.body.email}, 'secretkeyTODO');

      //TODO: Fix insert of pw_hash and salt. Right now it only accepts a number with one digit.
/*
client.query('INSERT INTO users(username, pw_hash, first_name, last_name, gender, email) values($1, $2, $3, $4, $5, $6)',
      [users.username, users.pw_hash, users.first_name, users.last_name, users.gender, users.email],
      function(error,results,fields) {
*/

    // TODO what are the changes any of this code below works with any of the code above 
    client.query('INSERT INTO users(username, pw_hash, first_name, last_name, gender, email) values($1, $2, $3, $4, $5, $6)',
      [users.username, hash, users.first_name, users.last_name, users.gender, users.email],
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

  });








}
