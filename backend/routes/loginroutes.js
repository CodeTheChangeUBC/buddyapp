var pg = require('pg');

const   connection = {
	host	: 'moonwalk-1.postgres.database.azure.com',
	user: process.env.USER,
	password: process.env.PASS,
	database: 'postgres',
	port: 5432,
	ssl: true
};

const client = new pg.Client(connection);
client.connect(err=> {
	if (err) {
		console.log("Error connecting database ... nn");
	}
	else {
		console.log("Database is connected ... nn");
	}
});


exports.register = function(req,res) {
	// console.log("req", req.body);	
	const users={
		username:req.body.username,
		pw_hash:req.body.pw_hash,
		salt:req.body.salt,
		first_name:req.body.first_name,
		last_name:req.body.last_name,
		gender:req.body.gender,
		email:req.body.email
	}
	client.query('INSERT INTO users(username, pw_hash, salt, first_name, last_name, gender, email) values($1, $2, $3, $4, $5, $6, $7)',
		    [users.username, users.pw_hash, users.salt, users.first_name, users.last_name, users.gender, users.email], 
		    function(error, results, fields) {
			if (error) {
				console.log("error occured", error);
				res.json({
					status:false,
					message:'there are errors with the query'
				})
		
			} else {
				res.json({
					status:true,
					data:results,
					message:'user registered sucessfully'
				})
			}
		});
}

exports.login = function(req,res) {
	var email= req.body.email;
	var pw_hash = req.body.pw_hash;
	client.query('SELECT * FROM users WHERE email = ?', [email],
		function (error, results, fields) {
			if(error) {
				// console.log("error occurred" , error);
				res.send({
					"code":400,
					" failed" :"error occurred" 
				})
			} else {
				// console.log('The solution is: ', results);
				if (results.length >0) {
					if([0].pw_hash == pw_hash) {
						res.send({
							"code":200,
							"success":"login successful" 
						});
					}
					else {
						res.send({
							"code":204,
							"success":"Email and password does not match" 
						});
					}
				}
				else{
					res.send({
						"code":204,
						"success":"Email does not exist"
					});
				}
			}
		});
}
