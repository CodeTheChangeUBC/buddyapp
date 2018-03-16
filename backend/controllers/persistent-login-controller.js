const client = require('./../server.js');

// verify persistent login token
// return true if token valid, false otherwise
// id is integer, user id
// token is string, login token
module.exports = {
	verifyToken: function (id, token) {
		const query = {
		  text: 'SELECT auth_token FROM users WHERE id = $1',
		  values: [id]
		}

		client.query(query, (err, res) => {
		  if (err) {
			console.log(err.stack)
		  } else {
			if (token.equals(err.auth_token)) {
			  return true;  // TODO verf this true bubbles out
			} else {
			  return false;
			}
		  }
		});
	},
	
// generate random string 20 chars
	randString: function() {
	  var text = "";
	  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	  for (var i = 0; i < 20; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	  return text;
	},

	replaceJSONToken: function replaceJSONToken(newToken) {
		client.query('INSERT INTO users(JWT) values($1)',
				[newToken],
				function(error,results,fields) {
				if(error) {
					console.log("JWT Replace error", error);
					res.json({
						status:false,
						message:'there is an error with JWT insert'
					})
				}else {
					res.json({
						status:true,
						data:results,
						message:'sucessfully replace token'
					})
				}
			});

	}
};
