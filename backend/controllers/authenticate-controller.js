var client = require('./../server.js');

var nJwt = require('njwt');
const uuid = require('uuid/v4')

module.exports.authenticateLogin=function(request,response){
	var username = request.body.username;
	var password = request.body.pw_hash; // Make the password first_name for now until we implement the encryption

	client.query("SELECT * FROM users WHERE username = ($1)", [username]).then(res => {
		var rows = res.rows;
		if(rows.length > 0){
			if(password==res.rows[0].pw_hash){
        var secretKey = uuid(); //Generates a cryptographically strong sign in key
        var claims = {
          sub: username,
          iss: 'localhost', //Issuer website should be changed in the future
          permissions: 'access' //What can the user access
        };
        var jwt = nJwt.create(claims,secretKey); //Creating jwt from the claims and uuid
        console.log(jwt); //Outputs to the console the token created

        //  var token = jwt.compact();//Gets a compact version of the actual token to be sent to user
        // console.log(token);

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



// middleware to authenticate an api call
module.exports.authenticateApi = function(request, response, next) {
  console.log("authenticating api call");

  console.log(request.body.jwt);

  // TODO need to fetch secret key for user to decrypt jwt
  server.jwt.verify(request.body.jwt, 'TODOGetSecretKeyForUser', function(err, decoded) {
    if (err) {
      console.log("Error decoding token");
    } else {
      console.log("Successfully decoded");
      // Add decrypted jwt token to pass on to func in case we need it, though we
      // probably can omit this 
      request.decoded = decoded;
      return next();
    }
  });
}
