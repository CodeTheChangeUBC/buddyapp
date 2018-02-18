var client = require('./../server.js');
const jwtGenerator = require('./../jwt-generator.js');


//var nJwt = require('njwt'); // outdated, we using jwsonwebtoken now
const uuid = require('uuid/v4')



// TODO this is current login function...
// middleware to authenticate a login, doesnt need JWT, just password
module.exports.authenticateLogin = function(request, response, next) {

  var username = request.body.username;
	var password = request.body.pw_hash;
  console.log("authenticating login");
//  server.db.all("SELECT pwhash FROM users WHERE email = ?", request.body.email, function(err, rows) {
  client.query("SELECT * FROM users WHERE username = ($1)", [username]).then(res => {
    if (err) {
      console.log("err")
      console.log(err.stack);
    } else {
      console.log("verifying password");

      server.bcrypt.compare(password, res.rows[0].pw_hash, function(error, response) {
        if (response) {
          console.log("authenticate pass");
          response.jwt = jwtGenerator.generateJWT(res.rows[0].id);

          next();

          // TODO remove password from request before proceeding?
        } else {
          console.log("authenticate fail");

          // TODO send response back failed login
        }
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

      // TODO verify date format
      var currentTime = new Date().getTime() / 1000;  // convert to seconds since epoch

      // 172800 is 2 days in seconds
      // jwt.exp is in NumericDate format, which is seconds since epoch
      // allegedly...

      // if user's jwt is within 2 days of expiring, refresh the expiry date
      // TODO do not refresh if user changed password????? 
      if (decoded.exp - currentTime < 172800 ) {
        response.jwt = jwtGenerator.generateJWT(decoded.user_id);
      } else {
        response.jwt = request.body.jwt;
      }


      return next();
    }
  });
}





















// NOTE old login function...
/*
module.exports.authenticateLogin=function(request,response){
	var username = request.body.username;
	var password = request.body.pw_hash; // Make the password first_name for now until we implement the encryption

	client.query("SELECT * FROM users WHERE username = ($1)", [username]).then(res => {
		var rows = res.rows;
		if(rows.length > 0){
			if(password==res.rows[0].pw_hash){
        var secretKey = uuid(); // TODO generate single key for all jwt //Generates a cryptographically strong sign in key
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

*/
