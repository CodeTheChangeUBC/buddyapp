var client = require('./../server.js');

module.exports.authenticate=function(request,response){
	var username = request.body.username;
	var password = request.body.pw_hash; // Make the password first_name for now until we implement the encryption

	client.query("SELECT * FROM users WHERE username = ($1)", [username]).then(res => {
		console.log(res);
		var rows = res.rows;
		if(rows.length > 0){
			if(password==res.rows[0].pw_hash){
				response.json({
					status:true,
					message:'successfully authenticated'
				})
			}else{
				response.json({
					status:false,
					message:"Username and password does not match"	
				});
			}
		
		} 
		else{

			response.json({
				status:false,
				message:'Username does not exist'
			});
		}
	}).catch(err => {
		console.log(err);
		response.sendStatus(500);
	});
}
