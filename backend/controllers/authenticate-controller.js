var connection = require('./../config');

module.exports.authenticate=function(req,res){
	var username = req.body.username;
	var password=req.body.first_name; // Make the password first name for now until we implement the encryption
	connection.query('SELECT * FROM users WHERE username = ?', [username], function(error, results, fields) {
		if(error) {
			res.json({
				status:false,
				message:'there was an error with the query'
			})
		}else{
			if(results.length > 0) {
				if(password==results[0].first_name){
					res.json({
						status:true,
						message:'successfully authenticated'
					})
				}else{
					res.json({
						status:false,
						message:'Username and password does not match'
					});
				}

			}
			else{
				res.json({
					status:false,
					message:'Username does not exist'
				});
			}
		}
	});
}
